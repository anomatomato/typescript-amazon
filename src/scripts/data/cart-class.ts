// Class: object generator
import { CartProduct, DeliveryOptionId } from '../types';
import { validDeliveryOptionIds } from './deliveryOptions';

export class Cart {
  cartItems: CartProduct[] = [];
  #localStorageKey: string;

  constructor(localStorageKey: string) {
    this.#localStorageKey = localStorageKey;
    this.#loadCartFromStorage();
  }

  #loadCartFromStorage(): void {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey) || JSON.stringify(null));
    if (!this.cartItems) {
      this.cartItems =
        [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      this.saveCartToStorage();
    }
  }

  saveCartToStorage(): void {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId: string): void {
    const quantitySelector = document.querySelector<HTMLSelectElement>(
      `.js-quantity-selector-${productId}`
    );
    const quantity: number = quantitySelector ? Number(quantitySelector.value) : 1;

    // Find matching item, or add if it doesnt exist
    const matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    this.saveCartToStorage();
  }
  removeFromCart(productId: string): void {
    const newCart: CartProduct[] = this.cartItems.filter((cartItem) => cartItem.productId !== productId);

    this.cartItems = newCart;

    this.saveCartToStorage();
  }

  updateDeliveryOption(productId: string, deliveryOptionId: DeliveryOptionId): void {
    const matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
    if (!matchingItem) {
      console.error(`No Cart Product found with productID: ${productId}`);
      return;
    } else if (!validDeliveryOptionIds.includes(deliveryOptionId)) {
      console.error(`Not a valid deliveryOptionId: ${deliveryOptionId}`);
      return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveCartToStorage();
  }

  updateQuantity(productId: string, newQuantity: number): void {
    const matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);

    if (matchingItem) {
      matchingItem.quantity = newQuantity;
    } else {
      this.cartItems.push({
        productId,
        quantity: newQuantity,
        deliveryOptionId: '1'
      });
    }

    this.saveCartToStorage();
  }


  calculateCartQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}

export const cart = new Cart('cart');

export function loadCart(fun: () => void): void {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch(): Promise<string> {
  const response: Response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text()
  console.log(text);
  return text;
}