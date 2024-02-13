import express from "express";
import {
  login,
  register,
  totpSignIn,
  verify,
} from "../Controllers/userController.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.post("/login/totp", verify);

router.post("/register/totpSignIn", totpSignIn);

export default router;
