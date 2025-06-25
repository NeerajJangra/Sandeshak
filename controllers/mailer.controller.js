import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import { OTP_TEXT } from "../constants.js";
import {
  checkVerificationCode,
  saveVerificationCode,
  VerifyUser,
} from "../services/otpServices.js";
import { generateOTP } from "../utility/generateOtp.js";

dotenv.config();
sgMail.setApiKey(process.env.SGRID_API_KEY);

export const sendEmail = async (req, res) => {
  const { to } = req.body;

  const otp = generateOTP();

  try {
    await saveVerificationCode(to, otp);
    const message = {
      to,
      from: process.env.SENDER_MAIL,
      subject: "Verify Email",
      text: OTP_TEXT(otp),
    };
    const info = await sgMail.send(message);
    res.status(200).json({ success: true, info });
  } catch (err) {
    if (err.message == "User not found") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

export const verifyCode = async (req, res) => {
  const { code, email } = req.body;
  try {
    const VerificationCode = await checkVerificationCode(email, code);
    await VerifyUser(email);
    res.status(201).json({ message: `Code is Verified ${VerificationCode}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
