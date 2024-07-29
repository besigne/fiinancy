import { CurrencyEnum, LanguageEnum } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z.object({
  fixedIncome: z.optional(z.coerce.number().multipleOf(0.01)).nullable(),
  fixedExpenses: z.optional(z.coerce.number().multipleOf(0.01)).nullable(),
  savedAmmount: z.optional(z.coerce.number().multipleOf(0.01)).nullable(), 
  language: z.enum([LanguageEnum.enUS, LanguageEnum.ptBR]),
  currency: z.enum([CurrencyEnum.USD, CurrencyEnum.BRL]),
  darkMode: z.optional(z.boolean()),
});