import User from "../Models/User.js";
import userKey from "../Models/userKey.js";
import userChat from "../Models/userchat.js";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const { sign } = jwt;

export const login = async (req, res) => {
  const { email, password, fingerprint } = req.body;
  // Find the user with the given email address

  const user = await User.findOne({
    userId: email,
  });
  if (!user) {
    return res.status(404).send({ message: "Invalid Emailid/password" });
  } else {
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    } else {
      // User is authenticated
      if (user.partial_execution === true) {
        const secret = speakeasy.generateSecret({ length: 20 });
        QRCode.toDataURL(secret.otpauth_url, async (err, image_data) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
          } else {
            await User.findOneAndUpdate(
              { userId: user.userId },
              { $set: { secret: secret.base32 } }
            );
            return res.status(201).send({
              qrCode: image_data,
              message: "Sign In Partially Executed",
            });
          }
        });
      } else {
        const tokenCode = sign(
          {
            userId: user.userId,
          },
          process.env.SECRET
        );
        await User.findOneAndUpdate(
          { userId: user.userId },
          { $set: { fingerprint: fingerprint } }
        );
        return res.status(200).send({
          userId: user.userId,
          tokenCode,
        });
      }
    }
  }
};

export const verify = async (req, res) => {
  const { token, userId } = req.body;
  console.log(token);
  const user = await User.findOne({ userId: userId });

  const base32secret = user.secret;
  // Verify the user's token
  var verified = speakeasy.totp.verify({
    secret: base32secret,
    encoding: "base32",
    token,
  });
  if (!verified) {
    return res.status(401).send("Invalid token");
  } else {
    const tokenCode = sign(
      {
        userId: user.userId,
      },
      process.env.SECRET
    );
    const userKeys = await userKey.findOne({ userId: user.userId });
    res.status(200).send({
      message: "Successfull",
      tokenCode: tokenCode,
      privateKey: userKeys.privateKey,
    });
  }
};

export const register = async (req, res) => {
  const { name, email, password, fingerprint } = req.body;
  console.log(req.body);
  // Generate a new secret key for the user
  if (!name || !email || !password || !fingerprint) {
    console.log("Data required");
    throw new Error("Missing required fields.");
  }

  // Generate a new secret key for the user
  const secret = speakeasy.generateSecret({ length: 20 });

  // Encrypt the password
  const encryptedPassword = await bcryptjs.hash(password, 10);

  // Save the user data in the database
  const user = await User.create({
    name: name,
    userId: email,
    password: encryptedPassword,
    secret: secret.base32,
    fingerprint,
  });

  console.log("User Created");

  const tokenCode = sign(
    {
      userId: user.userId,
    },
    process.env.SECRET
  );
  console.log("Token created");
  // Generate a QR code for the user to scan
  QRCode.toDataURL(secret.otpauth_url, async (err, image_data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    console.log("QRCode created");
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    console.log("Keys created");
    // Convert keys to strings
    const privateKeyString = privateKey.toString();
    const publicKeyString = publicKey.toString();

    console.log("Private Key:");
    console.log(privateKeyString);

    console.log("\nPublic Key:");
    console.log(publicKeyString);
    // console.log(keyCombo.publicKey);
    if (privateKey && publicKey) {
      const keys = await userKey.create({
        userId: user.userId,
        publicKey: publicKey,
        privateKey: privateKey,
      });
      console.log("Keys saved to db");
    }

    if (user.userId) {
      await userChat.create({ userId: user.userId });
    }

    // Send the QR code to the user
    res.status(200).send({ qrCode: image_data, tokenCode: tokenCode });
  });
};

export const totpSignIn = async (req, res) => {
  const { userId, token } = req.body;
  const user = await User.findOne({ userId: userId });
  console.log(user);
  const base32secret = user.secret;
  // Verify the user's token
  var verified = speakeasy.totp.verify({
    secret: base32secret,
    encoding: "base32",
    token,
  });
  if (!verified) {
    return res.status(401).send("Invalid token");
  } else {
    console.log(verified);
    await User.updateOne(
      { userId: userId, partial_execution: true },
      { $set: { partial_execution: false } }
    );
  }
  const tokenCode = sign(
    {
      userId: User.userId,
    },
    process.env.SECRET
  );
  const userKeys = await userKey.findOne({ userId: user.userId });
  res
    .status(200)
    .send({ tokenCode: tokenCode, privateKey: userKeys.privateKey });
};
