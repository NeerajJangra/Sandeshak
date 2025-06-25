import { Router } from "express";
import { sendEmail, verifyCode } from "../controllers/mailer.controller.js";

const emailRouter = Router();

emailRouter.post("/send-verification-code", sendEmail);
emailRouter.post("/verify-code", verifyCode);

export default emailRouter;
