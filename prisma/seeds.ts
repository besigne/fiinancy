import { PrismaClient, CurrencyEnum, LanguageEnum } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const currencies = [
    { currency: CurrencyEnum.USD, language: 'en-US' },
    { currency: CurrencyEnum.BRL, language: 'pt-BR' },
  ];

  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { currency: currency.currency },
      update: {},
      create: currency,
    });
  }

  console.log('\n 🌱 Currency mappings added.');

  const languages = [
    { code: LanguageEnum.enUS, language: 'en-US' },
    { code: LanguageEnum.ptBR, language: 'pt-BR' },
  ];

  for (const language of languages) {
    await prisma.language.upsert({
      where: { code: language.code },
      update: {},
      create: language,
    });
  }
}

  console.log('\n 🌱 Language mappings added.');

  main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
