import { calculateCartQuantity, cart } from '../../data/cart';
import { getDeliveryOption } from '../../data/deliveryOptions';
import { getProduct } from '../../data/products';
import { DeliveryOption } from '../../types';
import { getElement } from '../utils/dom-utils';
import { formatCurrency } from '../utils/money';

export function renderPaymentSummary() {
  let productPriceCents: number = 0;
  let shippingPriceCents: number = 0;

  cart.forEach((cartItem) => {
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
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  getElement<HTMLDivElement>('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}