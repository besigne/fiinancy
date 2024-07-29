import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { createToken, deleteToken, getVerificationTokenByEmail } from "@/data/verification-token";

import { 
  createPasswordResetToken,
  deletePasswordResetToken,
  getPasswordResetTokenByEmail
} from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import {
  createTwoFactorToken,
  deleteTwoFactorToken
} from "@/data/two-factor-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteToken(existingToken.id);
  }

  const verificationToken = await createToken(email, token, expires);

  return verificationToken;
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if(existingToken) {
    await deletePasswordResetToken(existingToken.id);
  }

  const passwordResetToken = await createPasswordResetToken(email, token, expires);

  return passwordResetToken;
}

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await deleteTwoFactorToken(existingToken.id);
  }

  return await createTwoFactorToken(email, token, expires);
}