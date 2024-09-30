import { getElement } from '../dom-utils.js';
import { CartProduct } from '../types.js';

const cart: CartProduct[] = [];

function handleAddToCart(productId: string): void {
  const quantitySelector = getElement<HTMLSelectElement>(
    `.js-quantity-selector-${productId}`
  );
  const quantity: number = Number(quantitySelector.value);

  // Find matching item, or add if it doesnt exist
  updateCart(productId, quantity);
}

function updateCart(productId: string, quantity: number): void {
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity
    });
  }
}

export { cart, handleAddToCart };
