"use server";

import * as z from "zod";

import { currenUserId } from "@/lib/auth";
import { defaultVerification } from "@/lib/default-verification";
import { createUserGoal, findAllUserGoalsByUserId } from "@/data/user-goals";
import { CreateUserGoalSchema, FormUserGoalSchema } from "@/schemas/user-goals";
import { userIdSchema } from "@/schemas/user";

export const searchGoals = async () => {

  if (!await defaultVerification()) {
    return { error: "erro" }
  }
  const userId: z.infer<typeof userIdSchema> = await currenUserId() as string;

  const search = await findAllUserGoalsByUserId(userId);

  const result = JSON.parse(JSON.stringify(search))
  console.log(result);

  return { data: result }
}

// TODO: Apagar isso, foi só teste
export const createGoal = async (
  values: z.infer<typeof FormUserGoalSchema>
) => {

  if (!await defaultVerification()) {
    return { error: "erro" }
  }

  const userId: z.infer<typeof userIdSchema> = await currenUserId() as string;

  const updatePackage: z.infer<typeof CreateUserGoalSchema> = { userId, ...values }

  const query = await createUserGoal(updatePackage);
  console.log(query);
  if (!query) {
    return { error: "Alguma coisa deu errado"}
  }

  return { success: "Novo objetivo criado" }
}