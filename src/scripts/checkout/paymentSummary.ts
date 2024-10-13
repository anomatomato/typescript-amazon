import { cart } from '../data/cart-class';
import { getDeliveryOption } from '../data/deliveryOptions';
import { addOrder } from '../data/orders';
import { getProduct } from '../data/products';
import { DeliveryOption } from '../types';
import { getElement } from '../utils/dom-utils';
import { formatCurrency } from '../utils/money';

export function renderPaymentSummary() {
  let productPriceCents: number = 0;
  let shippingPriceCents: number = 0;

  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    if (!product) {
      return;
    }
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption: DeliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;

  });

  const totalBeforeTaxCents: number = productPriceCents + shippingPriceCents;
  const taxCents: number = totalBeforeTaxCents * 0.1;
  const totalCents: number = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
      Place your order
    </button>
  `;

  getElement<HTMLDivElement>('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  getElement<HTMLButtonElement>('.js-place-order-button')
    .addEventListener('click', async () => {
      try {
        // Wait for fetch to finish, then continue in next line
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart.cartItems
          })
        });

        const order = await response.json()
        addOrder(order);
      } catch (error) {
        console.log('Unexpected error. Try again later.');
      }

      window.location.href = 'orders.html';
    });
}