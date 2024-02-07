import mongoose from "mongoose";
const ChatKeySchema = new mongoose.Schema(
  {
    chatid: {
      type: String,
      required: true,
      unique: true,
    },
    secretKey: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, collection: "chatKey" }
);

const model = new mongoose.model("ChatKey", ChatKeySchema);
export default model;
