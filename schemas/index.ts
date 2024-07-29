import { CurrencyEnum, LanguageEnum, UserRole } from "@prisma/client";
import * as z from "zod";

// TODO: Organizar os schemas e files separados

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Password is required"
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required"
  }),
  name: z.string().min(1, {
    message: "Name is required"
  })
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required"
  }),
});

export const UserSettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path:["password"]
  });

export const SettingsSchema = z.object({
  fixedIncome: z.optional(z.coerce.number().multipleOf(0.01)).nullable(),
  fixedExpenses: z.optional(z.coerce.number().multipleOf(0.01)).nullable(),
  savedAmmount: z.optional(z.coerce.number().multipleOf(0.01)).nullable(), 
  language: z.enum([LanguageEnum.enUS, LanguageEnum.ptBR]),
  currency: z.enum([CurrencyEnum.USD, CurrencyEnum.BRL]),
  darkMode: z.optional(z.boolean()),
});

export const UserPreferencesSchema = z.object({
  userId: z.string(),
  currencyId: z.string(),
  languageId: z.string(),
  darkMode: z.boolean()
})