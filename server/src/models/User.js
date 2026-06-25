import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // allows multiple null/undefined
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "student",
  },
  interests: [String],
  goal: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ createdAt: -1 });

const userModel = mongoose.model("user", userSchema);
export default userModel;
