import { db } from "@/lib/db";
import { UserPreferencesSchema } from "@/schemas";

import * as z from "zod";

export const createUserPreferences = async (
  values: z.infer<typeof UserPreferencesSchema>
) => {
  try {
    
    return await db.userPreferences.create({
      data: {...values}
    });
  
  } catch {
    return null;
  }
};

export const updateUserPreferences = async (
  values: z.infer<typeof UserPreferencesSchema>
) => {
  try {

    return await db.userPreferences.update({
      where: { userId: values.userId },
      data: {...values}
    });
  
  } catch {
    return null;
  }
};

export const getUserPreferencesByUserId = async (
  userId: string
) => {
  try {
    
    return await db.userPreferences.findUnique({
      where: { userId },
      select: {
        id: true,
        userId: true,
        currencyId: true,
        darkMode: true,
        currency: {
          select:{
            currency: true
          },
        },
        language: {
          select: {
            code: true,
            language: true
          },
        },
      },
    });
    
  } catch {
    return null;
  }
}