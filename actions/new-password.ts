"use server";

import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";
import { deletePasswordResetToken, getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail, updatePassword } from "@/data/user";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if(!token) {
    return { error: "Missing token!" }
  };

  const validatedFields = NewPasswordSchema.safeParse(values);

  if(!validatedFields.success) {
    return { error: "Invalid Fields!" }
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if(!existingToken) {
    return { error: "Invalid token!" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" }
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Something went wrong!" }
  }

  await updatePassword(existingUser.id, password);
  await deletePasswordResetToken(existingToken.id);

  return { success: "Password updated!" }
};