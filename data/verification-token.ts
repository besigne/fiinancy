import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (
  token: string
) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token }
    })

    return verificationToken;
  } catch {
    return null;
  }
}

export const getVerificationTokenByEmail = async (
  email: string
) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    })

    return verificationToken;
  } catch {
    return null;
  }
}

export const createToken = async (
  email: string,
  token: string,
  expires: Date
) => {
  try {

    const newToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires
      }
    })

    return newToken;

  } catch {
    return null;
  }
}

export const deleteToken = async (
  id: string
) => {
  try {
    await db.verificationToken.delete({
      where: { id }
    })

  } catch {
    return null;
  }
}