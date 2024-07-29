"use server"

import { getUserByEmail, updateUserToken } from "@/data/user";
import { deleteToken, getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User does not exist!" };
  }

  await updateUserToken(existingUser.id, existingToken.email);

  await deleteToken(existingToken.id);

  return { success: "Email verified!" }
}