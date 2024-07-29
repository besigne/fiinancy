import { db } from "@/lib/db";

export const getTransactionCategoryByUserId = async (userId: string) => {
  try {
    const descriptions = await db.transactionCategory.findMany({
      where: { userId },
      select: {
        description: true
      }
    })

    return descriptions;

  } catch {
    return null;
  }
}