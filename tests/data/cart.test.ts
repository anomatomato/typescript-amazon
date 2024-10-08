import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cart, handleAddToCart, loadCartFromStorage } from '../../src/scripts/data/cart';


describe('test suite: handleAddToCart', () => {

  const productId: string = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    // Mock DOM element for quantity selector
    const quantitySelector = document.createElement('select');
    quantitySelector.className = `js-quantity-selector-${productId}`;
    quantitySelector.innerHTML =
      `
      <option value="1">1</option>
      <option value="2" selected>2</option>
    `;
    document.body.appendChild(quantitySelector);
  })

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('adds an existing product to the cart', () => {
    vi.spyOn(localStorage, 'setItem');
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      return JSON.stringify([{
        productId,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    })

    loadCartFromStorage();
    handleAddToCart(productId);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(3);
  });

  it('adds a new product to the cart', () => {
    vi.spyOn(localStorage, 'setItem');
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      return JSON.stringify([]);
    })

    loadCartFromStorage();
    handleAddToCart(productId);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);
  });
});