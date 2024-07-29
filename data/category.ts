import { db } from "@/lib/db";
import { CurrencyEnum } from "@prisma/client";

export const getCurrencyIdByCurrencyCode = async (
  currency: CurrencyEnum
) => {
  try {
    
    const query = await db.currency.findUnique({
      where: { currency },
      select: {
        id: true
      },
    });

    return query?.id;
    
  } catch {
    return null;
  }
}