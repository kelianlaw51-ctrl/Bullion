export type ISO4217 = string; // e.g., 'EUR', 'USD'

export type Price = {
  amount_minor: number; // 1299 represents 12.99 in currency minor units
  currency: ISO4217;
};

export function formatMoney(
  price: Price,
  locale: string = 'en-DE'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: price.currency,
      currencyDisplay: 'symbol',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(price.amount_minor / 100);
  } catch {
    // Fallback: simple formatting if locale/currency invalid
    const major = (price.amount_minor / 100).toFixed(2);
    return `${price.currency} ${major}`;
  }
}
