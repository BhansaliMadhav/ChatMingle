import User from '../Models/User.js';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export const login = (req, res) => {
  const { email, password, token } = req.body;
  // Find the user with the given email address
  const user = User.find({
    email: email
  }
    
  );
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

export const register = (req, res) => {
    const { name, email, password } = req.body;
    // Generate a new secret key for the user
    const secret = speakeasy.generateSecret({ length: 20 });
    // Save the user data in the database
    const user = new User(name, email, password, secret.base32);
    User.push(user);
    // Generate a QR code for the user to scan
    QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      // Send the QR code to the user
      res.send({ qrCode: image_data });
    });
  };