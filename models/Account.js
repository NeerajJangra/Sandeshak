import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    VerificationCode: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpExpiresAt: { type: Date },
  },
  { timestamps: true }
);

export const Account = mongoose.model("Account", AccountSchema);
