export function formatCurrency(priceCents: number): string {
  return (priceCents / 100).toFixed(2);
}

// Only 1 default export
export default formatCurrency;