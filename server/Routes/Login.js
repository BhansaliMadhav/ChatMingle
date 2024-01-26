const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/login', userController.login, (req, res) => {
  // This route handler will only be called if the user's token is valid
  res.send('Protected resource accessed successfully');
});

module.exports = router;
