import express from 'express';
import { login, register } from '../Controllers/userController.js';
const router = express.Router();

router.post('/login', login, (req, res) => {
  // This route handler will only be called if the user's token is valid
  res.send('Protected resource accessed successfully');
});
router.post('/register', register);

export default router;
