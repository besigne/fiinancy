export const CurrencyFormatter = (locale: string, currency: string) => {

  return new Intl.NumberFormat(locale, {
    currency: currency,
    currencyDisplay: "symbol",
    style: 'currency',
    currencySign: "standard",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};