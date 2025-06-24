import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import { OTP_TEXT } from "../constants.js";
import { generateOTP } from "../utility/generateOtp.js";

dotenv.config();
sgMail.setApiKey(process.env.SGRID_API_KEY);

export const sendEmail = async (req, res) => {
  const { to } = req.body;

  //   console.log("reqbody: ", to, subject, text);
  const otp = generateOTP();

  try {
    const message = {
      to,
      from: process.env.SENDER_MAIL,
      subject: "Verify Email",
      text: OTP_TEXT(otp),
    };
    const info = await sgMail.send(message);
    res.status(200).json({ success: true, info });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
