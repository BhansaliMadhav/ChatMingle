import User from "../Models/User.js";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const { sign } = jwt;

export const register = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;
    const encryptedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      emailId: email,
      userName,
      password: encryptedPassword,
    });
    const tokenCode = sign(
      {
        emailId: user.emailId,
      },
      process.env.SECRET
    );
    res.status(200).send({ tokenCode: tokenCode });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      // Duplicate key error for userName and EmailId
      res.status(400).json({ error: "EmailId or username already exists" });
    } else if (err.name === "ValidationError") {
      // Validation error (e.g., missing required fields) if some field doesn't exist
      res.status(400).json({ error: err.message });
    } else {
      // Other unexpected errors
      console.error("Error during registration:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    // Finding the user based on username or email
    const user = await User.findOne({
      $or: [{ userName: id }, { emailId: id }],
    }).select("-secret");

    // If user is not found, return error
    if (!user) {
      return res.status(400).send({ message: "Invalid userId or Password" });
    }

    // Comparing passwords
    const password_verify = await bcryptjs.compare(password, user.password);

    // If passwords match, create token and send it as response
    if (password_verify) {
      const tokenCode = sign(
        {
          emailId: user.emailId,
        },
        process.env.SECRET
      );
      return res.status(200).send({ tokenCode: tokenCode });
    } else {
      // If passwords do not match, return error
      return res.status(400).send({ message: "Invalid userId or Password" });
    }
  } catch (err) {
    // Handle any unexpected errors
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
