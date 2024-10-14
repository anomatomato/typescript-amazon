import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { renderOrderSummary } from "../../src/scripts/checkout/orderSummary";
import { renderPaymentSummary } from "../../src/scripts/checkout/paymentSummary";
import { cart } from "../../src/scripts/data/cart-class";
import { loadProductsFetch } from "../../src/scripts/data/products";
import { getElement } from "../../src/scripts/utils/dom-utils";

/** Things to test:
 * 1. How the page looks
 * 2. How the page behaves
 */
describe('test suite: renderOrderSummary', () => {
  const productId1: string = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productName1: string = 'Black and Gray Athletic Cotton Socks - 6 Pairs';
  const productPrice1: string = '$10.90';
  const productId2: string = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productName2: string = 'Intermediate Size Basketball';
  const productPrice2: string = '$20.95';

  beforeAll(async () => {
    await loadProductsFetch();
  });

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
    cart.cartItems =
      [{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }];

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

    expect(
      getElement<HTMLDivElement>(`.js-product-name-${productId1}`).innerText.trim()
    ).toEqual(productName1);
    expect(
      getElement<HTMLDivElement>(`.js-product-name-${productId2}`).innerText.trim()
    ).toEqual(productName2);

    expect(
      getElement<HTMLDivElement>(`.js-product-price-${productId1}`).innerText.trim()
    ).toEqual(productPrice1);
    expect(
      getElement<HTMLDivElement>(`.js-product-price-${productId2}`).innerText.trim()
    ).toEqual(productPrice2);
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
    expect(
      getElement<HTMLDivElement>(`.js-product-name-${productId2}`).innerText.trim()
    ).toEqual(productName2);

    expect(
      getElement<HTMLDivElement>(`.js-product-price-${productId2}`).innerText.trim()
    ).toEqual(productPrice2);

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });

  it('updated the delivery option', () => {
    getElement<HTMLDivElement>(`.js-delivery-option-${productId1}-3`).click()
    const inputElement = getElement<HTMLInputElement>(`.js-delivery-option-input-${productId1}-3`);

    renderPaymentSummary();

    expect(inputElement.checked).toEqual(true);
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(
      getElement<HTMLDivElement>('.js-payment-summary-shipping').innerText.trim()
    ).toEqual('$14.98');
    expect(
      getElement<HTMLDivElement>('.js-payment-summary-total').innerText
    ).toEqual('$63.50');
  });
});