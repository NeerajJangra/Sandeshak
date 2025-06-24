import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SGRID_API_KEY);

export const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  console.log("reqbody: ", to, subject, text);

  try {
    const message = {
      to,
      from: process.env.SENDER_MAIL,
      subject,
      text,
    };
    const info = await sgMail.send(message);
    res.status(200).json({ success: true, info });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
