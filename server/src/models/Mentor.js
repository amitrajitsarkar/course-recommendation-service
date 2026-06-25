import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    username: {
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
    role:{
        type:String,
        default: "mentors"
    }
  },
  {
    timestamps: true,
  },
);

const mentorModel = await mongoose.model("mentor", mentorSchema);
export default mentorModel;

