import * as z from "zod";

// export const CategoriesForm = z.object({
//   description:
// });

export const createUserCategorySchema = z.object({
  userId: z.string(),
  description: z.string()
});