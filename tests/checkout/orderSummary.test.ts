import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderOrderSummary } from "../../src/scripts/checkout/orderSummary";
import { cart, loadCartFromStorage } from "../../src/scripts/data/cart";
import { getElement } from "../../src/scripts/utils/dom-utils";

/** Things to test:
 * 1. How the page looks
 * 2. How the page behaves
 */
describe('test suite: renderOrderSummary', () => {
  const productId1: string = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2: string = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    const orderSummary = document.createElement('div');
    orderSummary.className = 'js-test-container';
    document.body.appendChild(orderSummary);

    const container = getElement<HTMLDivElement>('.js-test-container');
    container.innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-header-content"></div>
      <div class="js-payment-summary"></div>
    `;

    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      // Do nothing
    });
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadCartFromStorage();

    renderOrderSummary();

  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('displays the cart', () => {
    expect(
      document.querySelectorAll<HTMLDivElement>('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      getElement<HTMLDivElement>(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      getElement<HTMLDivElement>(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });

  it('removes a product', () => {
    getElement<HTMLSpanElement>(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll<HTMLDivElement>('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(
      getElement<HTMLDivElement>(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});