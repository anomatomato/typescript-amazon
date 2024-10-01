import { CartProduct } from '../types.js';
import { getElement } from '../utils/dom-utils.js';

let cart: CartProduct[] = loadCartFromStorage();

function handleAddToCart(productId: string): void {
  const quantitySelector = getElement<HTMLSelectElement>(
    `.js-quantity-selector-${productId}`
  );
  const quantity: number = Number(quantitySelector.value);

  // Find matching item, or add if it doesnt exist
  addQuantity(productId, quantity);
}

function addQuantity(productId: string, quantity: number): void {
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity
    });
  }

  saveCartToStorage();
}

function updateQuantity(productId: string, newQuantity: number): void {
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);

  if (matchingItem) {
    matchingItem.quantity = newQuantity;
  } else {
    cart.push({
      productId,
      quantity: newQuantity
    });
  }

  saveCartToStorage();
}

function removeFromCart(productId: string): void {
  const newCart: CartProduct[] = cart.filter((cartItem) => cartItem.productId !== productId);

  cart = newCart;

  saveCartToStorage();
}

function calculateCartQuantity(): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function saveCartToStorage(): void {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage(): CartProduct[] {
  let cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
  if (!cart) {
    cart =
      [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
      }];
  }
  return cart;
}

export { calculateCartQuantity, cart, handleAddToCart, removeFromCart, updateQuantity };
