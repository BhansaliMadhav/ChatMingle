import mongoose from "mongoose";

const userChat = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true, collection: "user-chat" }
);

const model = mongoose.model("user-chat", userChat);

export default model;
