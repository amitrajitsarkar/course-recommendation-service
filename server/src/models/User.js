import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // allows multiple null/undefined
  },
  password: {
    type: Striong,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  }
});

userSchema.index({createdAt: -1});

export const userModel = mongoose.model("user", userSchema);