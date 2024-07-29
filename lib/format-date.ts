import { LanguageEnum } from "@prisma/client";
import { format } from "date-fns";

export const dateStringToday = (locale?: LanguageEnum) => {
  if (locale === LanguageEnum.enUS) {
    return format(new Date(), "MM/dd/yyyy")
  }
  return format(new Date(), "dd/MM/yyyy")
}