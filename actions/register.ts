"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { sendVerificationEmail } from "@/lib/mail";
import { createUser, getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await createUser({
    data: {
      name,
      email,
      password,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken?.email as string,
    verificationToken?.token as string
  );

  return { success: "Confirmation mail sent!" };
};