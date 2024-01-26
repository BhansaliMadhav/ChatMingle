const { users } = require('./user');
const speakeasy = require('speakeasy');

const login = (req, res) => {
  const { email, password, token } = req.body;
  // Find the user with the given email address
  const user = users.find(u => u.email === email);
  // Validate the user's credentials
  if (!user || user.password !== password) {
    return res.status(401).send('Invalid credentials');
  }
  // Verify the user's token
  const verified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: 'base32',
    token,
    window: 1
  });
  if (!verified) {
    return res.status(401).send('Invalid token');
  }
  // User is authenticated
  res.send('Login successful');
};

module.exports = { login };
