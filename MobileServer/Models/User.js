import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    secret: {
      type: String,
      required: true,
      unique: true,
      default: null,
    },
    otp_verification: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, collection: "user-data" }
);

const model = mongoose.model("userData", User);
export default model;
