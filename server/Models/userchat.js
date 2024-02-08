import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    message: [chatId: {
        type: String,
        required: true,
        unique:true,
      },],
      userID:{
        type: String,
        required: true,
        unique:true,

      }
  },
  { timestamps: true, collection: "chat-data" }
);


const model = mongoose.model("ChatData", ChatSchema);

export default model;
