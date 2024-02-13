import User from "../Models/User.js";
export const SearchResult = async (req, res) => {
  const { text } = req.body;
  try {
    //Convert the text to lowercase for case insensitivity
    const searchText = text.toLowerCase();

    // Find users with userId partially matching the provided text
    const users = await User.find({}).select(
      "-password -secret -fingerprint -partial_execution -otp_verification -_id -createdAt -updatedAt -__v"
    );

    const filteredUsers = users.filter((user) => {
      const userIdChars = user.userId.toLowerCase().split("");
      const nameChars = user.name.toLowerCase().split("");
      const searchTextChars = searchText.split("");

      // Check if the first character of the userId matches the first character of the searchText
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
    });

    // Send the found users as a response or do further processing
    res.status(200).json(filteredUsers);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
