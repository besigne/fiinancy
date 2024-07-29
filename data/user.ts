import { db } from "@/lib/db";
import bcrypt from "bcryptjs";


export const getUserByEmail = async (email: string) => {
  try {

    const user = await db.user.findUnique({ where: { email } });
    return user;

  } catch {
    return null;
  }
}


export const getUserById = async (id: string) => {
  try {
    
    const user = await db.user.findUnique({ where: { id } });
    return user;
    
  } catch {
    return null;
  }
}

export const createUser = async (info: { data: { name: string, email: string, password: string } }) => {
  try {

    info.data.password = await bcrypt.hash(info.data.password, 10);
    await db.user.create(info);

  } catch {
    return null;
  }
}

export const verifyPassword = async (password: string, hash: string) => {
  try {

    return await bcrypt.compare(password, hash);

  } catch {
    return null;
  }
}

export const updatePassword = async (id: string, password: string) => {
  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

  } catch {
    return null;
  }
}

export const verifyUserEmail = async (id: string) => {
  try {

    return await db.user.update({
      where: { id },
      data: { emailVerified: new Date() }
    });

  } catch {
    return null;
  }
}

export const updateUserToken = async (id: string, email: string) => {
  try {

    await db.user.update({
      where: { id },
      data: {
        email,
        emailVerified: new Date()
      }
    });

  } catch {
    return null;
  }
}

export const updateUser = async (id: string, {...values}) => {
  try {

    return await db.user.update({
      where: { id },
      data: {...values}
    });
    
  } catch {
    return null;
  }
}

export const updateUserIncomeAndExpenses = async (
  id: string,
  fixedIncome: number,
  fixedExpenses: number,
  savedAmmount: number,
) => {
  try {
    
    await db.user.update({
      where: { id },
      data: {
        fixedIncome,
        fixedExpenses,
        savedAmmount
      }
    })

  } catch {
    return null;
  }
}