import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

const saltRound = Number(process.env.SALT) || 12;

class AuthController {
  async signup(req, res) {
    try {
      const { username, password, role } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required",
        });
      }

      const userName = username.trim().toLowerCase();

      const existingUser = await userModel.findOne({
        username: userName,
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, saltRound);

      const user = await userModel.create({
        username: userName,
        password: hashedPassword,
        role: role || "student",
        interests: req.body.interests || [],
        goal: req.body.goal || "",
      });

      return res.status(201).json({
        success: true,
        message: "Signup successful",
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await userModel.findOne({
        username: username.trim().toLowerCase(),
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      res.clearCookie("mentorToken");

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        "welcome" : user.username,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const username = req.body.username.trim().toLowerCase();

      const deletedUser = await userModel.findOneAndDelete({
        username,
      });

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "No such user found",
        });
      }

      return res.status(200).json({
        success: true,
        message: `User ${username} deleted successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default AuthController;
