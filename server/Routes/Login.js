import express from 'express';
import { login, register, totpSignIn, verify } from '../Controllers/userController.js';
const router = express.Router();

router.post('/login', login, (req, res) => {
  // This route handler will only be called if the user's token is valid
  res.send('Protected resource accessed successfully');
});
router.post('/register', register);

router.post('/login/totp', verify);

router.post('/register/totpSignIn', totpSignIn);

export default router;
