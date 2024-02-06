// controllers/otpController.js
import otpGenerator from "otp-generator";
import otpSchema from "../Models/otpModel.js";
import User from "../Models/User.js";
const OTP = otpSchema;
export const sendOTP = async (req, res) => {
  try {
    console.log(req.body);
    const { email } = req.body;

    // Check if user is already present
    const checkUserPresent = await User.findOne({ email });
    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = otpSchema.findOne({ email });
  if (user && user.otp === otp) {
    User.updateOne({ userId: email }, { otp_verification: true });
    res.status(200).send({ message: "Email verified successfully" });
  } else {
    res.status(401).send({ message: "email and / or password didnt match" });
  }
};
