import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mentor: {
      type: String, // username
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);