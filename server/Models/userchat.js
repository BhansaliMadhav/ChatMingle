import mongoose from "mongoose";
const chatId = {
  type: String,
  required: true,
  default: null,
};
const userChat = new mongoose.Schema(
  {
    chatIds: [chatId],
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, collection: "user-chat" }
);

const model = mongoose.model("user-chat", userChat);

export default model;
