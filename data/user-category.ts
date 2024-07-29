import * as z from "zod";
import { db } from "@/lib/db";

import { createUserCategorySchema } from "@/schemas/category";

export const createUserCategory = async (
  values: z.infer<typeof createUserCategorySchema>
) => {
  try {
    
    return await db.userCategory.create({
      data: {...values}
    });

  } catch {
    return null;
  }
}