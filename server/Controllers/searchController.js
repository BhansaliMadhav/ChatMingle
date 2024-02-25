import User from "../Models/User.js";
import Chat from "../Models/userchat.js";
import bcrypt from "bcrypt";
import ChatSchema from "../Models/chatModel.js";
import mongoose from "mongoose";
import userKeySchema from "../Models/userKey.js"
export const SearchResult = async (req, res) => {
  const { text } = req.body;
  try {
    const searchText = text.toLowerCase();

    const users = await User.find({}).select(
      "-password -secret -fingerprint -partial_execution -otp_verification -_id -createdAt -updatedAt -__v"
    );

    const filteredUsers = users
      .filter((user) => {
        const userIdChars = user.userId.toLowerCase().split("");
        const nameChars = user.name.toLowerCase().split("");
        const searchTextChars = searchText.split("");

        if (
          userIdChars.length < searchTextChars.length ||
          searchTextChars.length === 0
        ) {
          return false;
        }

        for (let i = 0; i < searchTextChars.length; i++) {
          if (
            userIdChars[i] !== searchTextChars[i] &&
            nameChars[i] !== searchTextChars[i]
          ) {
            return false;
          }
        }

        return true;
      })
      .map((user) => ({
        userId: user.userId,
      }));

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const CreateChatKey = async (req, res) => {
  const { userId1, userId2 } = req.body;
  console.log(userId1, userId2);
  try {
    // Create or find chat using the hashed key and user IDs
    const chat = await createOrFindChat( userId1, userId2);
    res.status(200).json({ chatId: chat });
  } catch (error) {
    console.error("Error generating chat key:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createOrFindChat = async ( userId1, userId2) => {
  console.log("function triggered");
  try {
    let chats = await ChatSchema.findOne({
      senderId: userId1,
      receiverId: userId2,
    }).select("-encryption_key");
    let chats2 = await ChatSchema.findOne({
      receiverId: userId1,
      senderId: userId2,
    }).select("-encryption_key");
console.log(chats,chats2);
    if (chats === null && chats2 === null) {
      const chatId = new mongoose.Types.ObjectId()
      const user1key = await userKeySchema.findOne({userId:userId1}).secretKey
      const user2key = await userKeySchema.findOne({userId:userId2}).secretKey
      const chatKey =   String.fromCharCode(user1key ^ user2key);
      console.log(chatKey);
      const chat = new ChatSchema({
        id: chatId,
        senderId:userId1,
        receiverId:userId2,
        encryption_key:chatKey,
        message:[{}],
      });
      await chat.save();
    }
    
    return chats;
  } catch (error) {
    console.error("Error creating or finding chat:", error);
    throw error;
  }
};
