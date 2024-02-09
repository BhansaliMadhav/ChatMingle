import mongoose from "mongoose";
const chatId = {
  type: String,
  unique: true,
};
const userChat = new mongoose.Schema(
  {
    chatIds: [chatId],
    userID: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, collection: "user-chat" }
);

const model = mongoose.model("user-chat", userChat);

export default model;
