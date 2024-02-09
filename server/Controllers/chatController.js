import ChatKey from "../Models/chatKey.js";

export const nugatory = async (req, res) => {
    const { userId } = req.body;
    // Find the user with the given email address
    const chatIds = ChatKey.find({userId: userId});
    console.log(chatIds)

    
  
  };

