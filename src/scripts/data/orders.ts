export const orders: unknown[] = JSON.parse(localStorage.getItem('orders') || 'null') || [];

export function addOrder(order: unknown): void {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(): void {
  localStorage.setItem('orders', JSON.stringify(orders));
}