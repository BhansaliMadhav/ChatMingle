import mongoose from "mongoose";
const User = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,

    },
    userId: {
      type: String,
      required: true,
      unique: true,
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
  },
  { timestamps: true, collection: "user-data" }
);

const model = mongoose.model("UserData", User);

export default model;