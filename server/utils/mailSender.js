import nodemailer from "nodemailer";
import aws from "@aws-sdk/client-ses";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
const mailSender = async (email, title, body) => {
  try {
    const ses = new aws.SES({
      apiVersion: "2010-12-01",
      region: "us-east-1",
      defaultProvider,
    });
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      SES: { ses, aws },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: "bhansalimadhav03@gmail.com",
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
export default mailSender;
