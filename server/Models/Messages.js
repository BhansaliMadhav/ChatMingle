const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" }, // userId of the sender
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" }, // chatId where the message belongs
    content: { type: String, required: true },

    // Other message fields...
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
