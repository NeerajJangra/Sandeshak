import dotenv from "dotenv";
import { transporter } from "../config/mailer.js";

dotenv.config();

export const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  console.log("reqbody: ", to, subject, text);

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
    res.status(200).json({ success: true, info });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
