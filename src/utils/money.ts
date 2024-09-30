export function formatCurrency(priceCents: number): string {
  return (priceCents / 100).toFixed(2);
}