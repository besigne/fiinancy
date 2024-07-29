import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import { CurrencyEnum, LanguageEnum, UserRole } from "@prisma/client";

import { getAccountByUserId } from "./data/account";
import { getUserById, verifyUserEmail } from "@/data/user";
import { getUserPreferencesByUserId } from "./data/user-preferences";
import { deleteTwoFactorConfirmation, getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await verifyUserEmail(user.id)
      }
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      
      if (user.id){
        const existingUser = await getUserById(user.id);
        if (!existingUser?.emailVerified) return false;
        
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

          if (!twoFactorConfirmation) return false;

          await deleteTwoFactorConfirmation(twoFactorConfirmation.id);

        }
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.id = token.sub as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.fixedIncome = token.fixedIncome as number;
        session.user.fixedExpenses = token.fixedExpenses as number;
        session.user.saveAmmout = token.savedAmmount as number;
        session.user.language = token.language as LanguageEnum;
        session.user.languageCode = token.languageCode as string;
        session.user.currency = token.currency as CurrencyEnum;
      }

      return session;
    },
    async jwt ({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      const userPreferences = await getUserPreferencesByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.language = userPreferences?.language.language;
      token.languageCode = userPreferences?.language.code;
      token.fixedIncome = existingUser.fixedIncome;
      token.fixedExpenses = existingUser.fixedExpenses;
      token.savedAmmount = existingUser.savedAmmount;
      token.currency = userPreferences?.currency.currency;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
