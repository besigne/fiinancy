"use server";

import { getCurrencyIdByCurrencyCode } from "@/data/category";
import { getLanguageIdByLanguageCode } from "@/data/language";
import { updateUserIncomeAndExpenses } from "@/data/user";
import { createUserPreferences, getUserPreferencesByUserId, updateUserPreferences } from "@/data/user-preferences";
import { currentUser } from "@/lib/auth";
import { defaultVerification } from "@/lib/default-verification";
import { SettingsSchema, UserPreferencesSchema } from "@/schemas";
import * as z from "zod";

export const userPreferences = async (
values: z.infer<typeof SettingsSchema>
) => {
  if(!await defaultVerification()) {
    return { error: "erro" }
  }
  const user = await currentUser();
  const currencyId = await getCurrencyIdByCurrencyCode(values.currency);
  const languageId = await getLanguageIdByLanguageCode(values.language);
  
  const existingUserPreferences = await getUserPreferencesByUserId(user?.id as string);
  
  const updatePackage: z.infer<typeof UserPreferencesSchema> = {
    userId: user?.id as string,
    currencyId: currencyId as string,
    languageId: languageId as string,
    darkMode: false
  };

  // TODO: alterar chave quando implementar darkmode
  if(!existingUserPreferences) {
    await createUserPreferences(updatePackage);

    return { success: "Saved new preferences"}
  }

  await updateUserIncomeAndExpenses(user?.id as string, values.fixedIncome as number, values.fixedExpenses as number, values.savedAmmount as number);
  await updateUserPreferences(updatePackage);

  return { success: "Updated successfully!" }
}