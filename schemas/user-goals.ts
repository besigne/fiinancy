import * as z from "zod";

export const CreateUserGoalSchema = z.object({
  userId: z.string(),
  description: z.string(),
  goal: z.number(),
  saved: z.number(),
  until: z.optional(z.date())
});

export const UpdateUserGoalSchema = z.object({
  id: z.string(),
  description: z.string(),
  goal: z.number(),
  saved: z.number(),
  until: z.optional(z.date())
});

export const DeleteUserGoalSchema = z.object({
  id: z.string()
});

export const FormUserGoalSchema = z.object({
  description: z.string(),
  goal: z.coerce.number().min(1),
  saved: z.coerce.number().default(0),
  until: z.optional(z.date()),
});