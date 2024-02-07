import mongoose from "mongoose";
const userKey = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    secretKey: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, collection: "UserKey" }
);
const model = mongoose.model("UserKey", userKey);

export default model;
