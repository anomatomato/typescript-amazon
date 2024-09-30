import { CartProduct } from '../types.js';
import { getElement } from '../utils/dom-utils.js';

const cart: CartProduct[] = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

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
