import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {

    const twoFactortoken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactortoken;

  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {

    const twoFactortoken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactortoken;

  } catch {
    return null;
  }
};

export const createTwoFactorToken = async (
  email: string,
  token: string,
  expires: Date
) => {
  try {
    const twoFactorToken = await db.twoFactorToken.create({
      data: {
        email,
        token,
        expires
      },
    });

    return twoFactorToken

  } catch {
    return null;
  }
}

export const deleteTwoFactorToken = async ( id: string) => {
  try {
    await db.twoFactorToken.delete({
      where: { id },
    })
    
  } catch {
    return null;
  }
}