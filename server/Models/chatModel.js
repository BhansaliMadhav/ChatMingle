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
const ChatSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    encryption_key: {
      type: Buffer,
      required: true,
      unique: true,
      trim: true,
    },
    senderId: {
      type: String,
      required: true,
      trim: true,
    },
    receiverId: { type: String, required: true, trim: true },
    message: [MessageSchema],
  },
  { timestamps: true, collection: "chat-data" }
);
ChatSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.$addToSet && update.$addToSet.messages) {
    // If there is an addToSet operation for messages array
    const newMessage = update.$addToSet.messages;
    // Update the document by prepending the new message to the array
    this.update(
      {},
      { $addToSet: { messages: { $each: [newMessage], $position: 0 } } }
    );
  }
  next();
});

const model = mongoose.model("ChatData", ChatSchema);

export default model;
