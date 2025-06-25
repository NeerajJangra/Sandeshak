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

export const checkVerificationCode = async (email, code) => {
  const { VerificationCode, otpExpiresAt, isVerified } = await Account.findOne({
    email,
  });
  if (!VerificationCode) {
    throw new Error("user not found");
  }
  if (isVerified) {
    throw new Error("user is already verified");
  }
  if (VerificationCode !== code) {
    throw new Error("code is invalid");
  }
  checkCodeExpiry(otpExpiresAt);

  return VerificationCode;
};

const checkCodeExpiry = (expiryDate) => {
  const date = new Date(Date.now());
  console.log(date);
  if (date > expiryDate) {
    throw new Error("code is Expired");
  }
};

export const VerifyUser = async (email) => {
  const user = await Account.findOne({ email });
  user.isVerified = true;
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
