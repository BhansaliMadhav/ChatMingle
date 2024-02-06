import express from "express";
import { sendOTP, verifyOTP } from "../Controllers/otpController.js";
const router = express.Router();
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
export default router;
