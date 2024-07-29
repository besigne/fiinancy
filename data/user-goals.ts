import * as z from "zod";
import { db } from "@/lib/db";

import {
  CreateUserGoalSchema,
  DeleteUserGoalSchema,
  UpdateUserGoalSchema
} from "@/schemas/user-goals";
import { userIdSchema } from "@/schemas/user";

export const findAllUserGoalsByUserId = async (
  userId: z.infer<typeof userIdSchema>
) => {
  try {

    return db.userGoal.findMany({
      where: { userId },
      select: {
        id: true,
        description: true,
        goal: true,
        saved: true,
        until: true
      }
    });
    
  } catch {
    return null;
  }
}

export const createUserGoal = async (
  values: z.infer<typeof CreateUserGoalSchema>
) => {
  try {
    
    return await db.userGoal.create({
      data: {...values}
    });

  } catch {
    return null;
  }
}

export const updateUserGoal = async (
  values: z.infer<typeof UpdateUserGoalSchema>
) => {
  try {
    
    return db.userGoal.update({
      where: {id: values.id},
      data: {...values}
    });

  } catch {
    return null;
  }
}

export const deleteUseGoal = async (
  values: z.infer<typeof DeleteUserGoalSchema>
) => {
  try {
    
    return db.userGoal.delete({
      where: {id: values.id}
    })

  } catch {
    return null;
  }
}