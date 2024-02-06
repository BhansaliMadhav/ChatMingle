import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Chat = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    encryption_key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    reciverId: { type: String, required: true },
    message: [MessageSchema],
  },
  { timestamps: true, collection: "chat-data" }
);
ChatSchema.pre("save", function (next) {
  this.messages.sort((a, b) => b.createdAt - a.createdAt);
  next();
});
const model = mongoose.model("ChatData", Chat);

export default model;
