import { db } from "@/lib/db";
import { LanguageEnum } from "@prisma/client";

export const getLanguageIdByLanguageCode = async (
  code: LanguageEnum
) => {
  try {
    
    const query = await db.language.findUnique({
      where: { code },
      select: {
        id: true
      },
    });

    return query?.id;

  } catch {
    return null;
  }
}