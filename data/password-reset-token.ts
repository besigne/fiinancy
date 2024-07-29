import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {

    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;

  } catch {
    return null;
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {

    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;

  } catch {
    return null;
  }
}

export const createPasswordResetToken = async (
  email: string,
  token: string,
  expires: Date
) => {
  try {

    const newPasswordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires
      },
    });

    return newPasswordResetToken;

  } catch {
    return null;
  }
}

export const deletePasswordResetToken = async (
  id: string
) => {
  try {
    await db.passwordResetToken.delete({
      where: { id }
    })
  } catch {
    return null;
  }
}