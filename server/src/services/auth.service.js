import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

const saltRound = Number(process.env.SALT) || 12;

class Auth {
  async signup(data) {
    if (!data.username || !data.password) {
      throw new Error("Username and password are required");
    }

    const username = data.username.trim().toLowerCase();

    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, saltRound);

    const user = await userModel.create({
      username,
      password: hashedPassword,
      role: data.role || "student",
    });

    return {
      id: user._id,
      username: user.username,
      role: user.role,
    };
  }

  async login(data) {
    if (!data.username || !data.password) {
      throw new Error("Username and password are required");
    }

    const username = data.username.trim().toLowerCase();

    const user = await userModel.findOne({ username });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
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

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    };
  }

  async delete(data) {
    if (!data?.username) {
      throw new Error("Username is required");
    }

    const username = data.username.trim().toLowerCase();

    const deletedUser = await userModel.findOneAndDelete({
      username,
    });

    if (!deletedUser) {
      throw new Error("No such user found");
    }

    return `User ${username} deleted successfully`;
  }
}

export default Auth;
