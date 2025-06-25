import { Account } from "../models/Account.js";

export const saveVerificationCode = async (email, code) => {
  const expiryDate = new Date(Date.now() + 10 * 60 * 1000);
  console.log(`email: ${email}, code: ${code}`);
  const user = await Account.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  user.VerificationCode = code;
  user.otpExpiresAt = expiryDate;
  await user.save();
};

export const addUser = async (email, password) => {
  try {
    const result = await Account.create({ email, password });
    console.log({ result });
  } catch (error) {
    console.log("error", error);
  }
};
