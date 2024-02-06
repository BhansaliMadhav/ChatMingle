import mongoose from "mongoose";
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      required: true,
      unique: true,
    },

    fingerprint: {
      type: Number,
      required: true,
    },

    partial_execution: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true, collection: "user-data" }
);

const model = mongoose.model("UserData", User);

export default model;
