"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { unstable_update } from "@/auth";
import { currentUser } from "@/lib/auth";
import { UserSettingsSchema } from "@/schemas";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail, getUserById, updateUser } from "@/data/user";

export const settings = async (
  values: z.infer<typeof UserSettingsSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(user?.id as string);
  if (!dbUser) {
    return { error: "Unauthorized" }
  }


  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken?.email as string,
      verificationToken?.token as string
    );

    return { success: "Verification email sent!" }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if(!passwordMatch) {
      return { error: "Incorrect password!" }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await updateUser(user?.id as string, { ...values });

  unstable_update({
    user: {
      name: updatedUser?.name,
      email: updatedUser?.email,
      isTwoFactorEnabled: updatedUser?.isTwoFactorEnabled,
      role: updatedUser?.role
    }
  });
  return { success: "Settings Updated!" }
}