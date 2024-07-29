import { CurrencyEnum, LanguageEnum, UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  fixedIncome: number;
  fixedExpenses: number;
  currency: CurrencyEnum;
  language: LanguageEnum;
  languageCode: string;
  saveAmmout: number;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
};