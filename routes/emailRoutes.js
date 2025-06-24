import { Router } from "express";
import { sendEmail } from "../controllers/mailer.controller.js";

const emailRouter = Router();

emailRouter.post("/send-email", sendEmail);

export default emailRouter;
