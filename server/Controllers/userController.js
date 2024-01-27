import User from "../Models/User.js";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import bcryptjs from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;
  // Find the user with the given email address
  const user = User.find({
    userId: email,
  });
  const encryptedPassword = await bcryptjs.hash(password, 10);
  // Validate the user's credentials
  if (!user || user.password !== encryptedPassword) {
    return res.status(401).send("Invalid credentials");
  } 
  // User is authenticated
  res.status(200).send({
    userId : user.userId
  });
};
export const verify = async (req, res) => {
  const { token, userId } = req.body;
  //userIdToFind 
  const user = await User.findOne({ userId: userId });
  const base32secret = user.secret
  // Verify the user's token
  var verified = speakeasy.totp.verify({ secret: base32secret,
    encoding: 'base32',
    token });
  if (!verified) {
    return res.status(401).send("Invalid token");
  }
};

export const register = async (req, res) => {
  const { name, email, password, fingerprint } = req.body;
  console.log(name);
  // Generate a new secret key for the user
  const secret = speakeasy.generateSecret({ length: 20 });
  
  const encryptedPassword = await bcryptjs.hash(password, 10);
  // Save the user data in the database
  const user = await User.create({
    name,
    userId: email,
    password: encryptedPassword,
    secret: secret.base32,
    fingerprint,
  });
  
  // Generate a QR code for the user to scan
  QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    // Send the QR code to the user
    res.status(200).send({ qrCode: image_data });
  });
};
