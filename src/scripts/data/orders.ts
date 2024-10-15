export type OrderItem = {
  productId: string,
  quantity: number,
  estimatedDeliveryTime: string,
}

export type Order = {
  id: string;
  orderTime: string;
  totalCostCents: number;
  products: OrderItem[];
}

export class OrderList {
  orders: Order[] = [];
  #localStorageKey: string;

  constructor(localStorageKey: string) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }


  addOrder(order: Order): void {
    this.orders.unshift(order); // Add the new order at the start
    this.saveToStorage();
  }

  #loadFromStorage(): void {
    this.orders = JSON.parse(localStorage.getItem(this.#localStorageKey) || 'null') || [];
  }

  saveToStorage(): void {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.orders));
  }
}

export const orderList: OrderList = new OrderList('orders');