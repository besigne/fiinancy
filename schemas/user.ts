import * as z from "zod";

export const userIdSchema = z.string();

export const UserValuesSchema = z.object({
  fixedIncome: z.optional(z.coerce.number().multipleOf(0.01)).default(0.0),
  fixedExpenses: z.optional(z.coerce.number().multipleOf(0.01)).default(0.0),
  savedAmmount: z.optional(z.coerce.number().multipleOf(0.01)).default(0.0), 
});