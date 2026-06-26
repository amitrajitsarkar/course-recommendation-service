import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    expertise: {
      type: [String],
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "mentor",
    },
  },
  {
    timestamps: true,
  }
);

const mentorModel = mongoose.model("Mentor", mentorSchema);

export default mentorModel;