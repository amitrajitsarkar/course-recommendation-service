import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mentorModel from "../models/Mentor.js";

const saltRound = Number(process.env.SALT) || 10;

class MentorController {
  async signup(req, res) {
    try {
      const { username, password, expertise, bio } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required",
        });
      }

      const mentorUsername = username.trim().toLowerCase();

      const existingMentor = await mentorModel.findOne({
        username: mentorUsername,
      });

      if (existingMentor) {
        return res.status(400).json({
          success: false,
          message: "Mentor already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, saltRound);

      const mentor = await mentorModel.create({
        username: mentorUsername,
        password: hashedPassword,
        expertise,
        bio,
      });

      return res.status(201).json({
        success: true,
        message: "Mentor registered successfully",
        data: {
          id: mentor._id,
          username: mentor.username,
          expertise: mentor.expertise,
          bio: mentor.bio,
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
      const username = req.body.username.trim().toLowerCase();
      const password = req.body.password;

      const mentor = await mentorModel.findOne({ username });

      if (!mentor) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, mentor.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        {
          mentorId: mentor._id,
          username: mentor.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.clearCookie("token");
      res.cookie("mentorToken", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: `Mentor : ${mentor.username} logged in successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new MentorController();