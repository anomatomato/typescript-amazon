// OOP: organize our code into objects

import { CartProduct, DeliveryOptionId } from '../types';
import { getElement } from '../utils/dom-utils';
import { validDeliveryOptionIds } from './deliveryOptions';

function Cart(localStorageKey: string) {
  const cart = {
    cartItems: [] as CartProduct[],


    loadCartFromStorage(): void {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey) || JSON.stringify([]));
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
      }
    },

    saveCartToStorage(): void {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId: string): void {
      const quantitySelector = getElement<HTMLSelectElement>(
        `.js-quantity-selector-${productId}`
      );
      const quantity: number = Number(quantitySelector.value);

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
    },
    removeFromCart(productId: string): void {
      const newCart: CartProduct[] = this.cartItems.filter((cartItem) => cartItem.productId !== productId);

      this.cartItems = newCart;

      this.saveCartToStorage();
    },
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
    },

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
    },


    calculateCartQuantity(): number {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('businessCart');

cart.loadCartFromStorage();
businessCart.loadCartFromStorage();

console.log(cart);
console.log(businessCart);