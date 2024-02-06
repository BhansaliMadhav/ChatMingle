import express from "express";
import otpController from "../Controllers/otpController.js";
const router = express.Router();
router.post("/send-otp", otpController);
export default router;
