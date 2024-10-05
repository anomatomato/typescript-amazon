// without {} is called default export, use when only want to export 1 thing
import dayjs from 'dayjs';
// This is named export
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

import { calculateCartQuantity, cart, removeFromCart, updateDeliveryOption, updateQuantity } from '../../data/cart';
import { deliveryOptions } from '../../data/deliveryOptions';
import { products } from '../../data/products';
import { CartProduct, Product } from '../../types';
import { getElement } from '..//utils/dom-utils';
import { formatCurrency } from '../utils/money';

const today = dayjs();
const deliveryDate = today.add(7, 'day');
console.log(deliveryDate.format('dddd, MMMM D'));

hello();
// --- Main Functions ---

function updateCartQuantity(): void {
  const cartQuantity: number = calculateCartQuantity();
  getElement<HTMLAnchorElement>('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
}

function saveNewQuantity(productId: string, newQuantity: number): void {
  if (newQuantity < 0) {
    alert('Quantity must be at least 0');
    return;
  }

  const container = getElement<HTMLDivElement>(`.js-cart-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');

  // Dont update, when newQuantity is NaN or 0
  if (newQuantity) {
    updateQuantity(productId, newQuantity);
    updateCartQuantity();

    getElement<HTMLSpanElement>(`.js-quantity-label-${productId}`)
      .innerHTML = newQuantity.toString();
  }
}

// --- Render Cart Items ---
function renderCartSummary(): void {
  let cartSummayHTML: string = '';

  cart.forEach((cartItem) => {
    const productId: string = cartItem.productId;

    const matchingProduct = products.find((product) => product.id === productId);
    if (!matchingProduct) {
      console.error(`No product found with productId: ${productId}`);
      return;
    }

    const deliveryOptionId: string = cartItem.deliveryOptionId;
    const deliveryOption = deliveryOptions.find((option) => option.id === deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption?.deliveryDays ?? 7, 'day'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummayHTML +=
      `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="js-update-link update-quantity-link link-primary"
            data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id} js-quantity-input" type="number"
            data-product-id=${matchingProduct.id}>
            <span class="save-quantity-link link-primary js-save-link"
            data-product-id=${matchingProduct.id}>Save</span>
            <span class="js-delete-link delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
  });

  getElement<HTMLDivElement>('.js-order-summary').innerHTML = cartSummayHTML;
}

function deliveryOptionsHTML(matchingProduct: Product, cartItem: CartProduct): string {
  let html: string = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'day'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;


    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html +=
      `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id=${deliveryOption.id}>
        <input type="radio" 
        ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });

  return html;
}

function setupEventListeners(): void {
  // Add event listeners for all Update links
  document.querySelectorAll<HTMLSpanElement>('.js-update-link')
    .forEach((link) => {

      link.addEventListener('click', () => {
        const productId: string | undefined = link.dataset.productId;
        if (!productId) {
          console.error(`No productId in update link: ${link}`);
          return;
        }

        const container = getElement<HTMLDivElement>(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
      });
    });

  document.querySelectorAll<HTMLInputElement>('.js-quantity-input')
    .forEach((input) => {
      input.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
          const productId: string | undefined = input.dataset.productId;
          if (!productId) {
            console.error(`No productId in quantity input: ${input}`);
            return;
          }

          const newQuantity: number = Number(input.value);
          saveNewQuantity(productId, newQuantity);
        }
      });
    });


  // Add event listeners for all Save links
  document.querySelectorAll<HTMLSpanElement>('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId: string | undefined = link.dataset.productId;
        if (!productId) {
          console.error(`No productId in save link: ${link}`);
          return;
        }

        const newQuantity: number = Number(getElement<HTMLInputElement>(`.js-quantity-input-${productId}`).value);

        saveNewQuantity(productId, newQuantity);
      });
    });

  // Add event listeners for all Delete links
  document.querySelectorAll<HTMLSpanElement>('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', (event) => {
        const productId: string | undefined = link.dataset.productId;
        if (!productId) {
          console.error(`No productId data in delete link: ${link}`);
          return;
        }

        removeFromCart(productId);

        getElement<HTMLDivElement>(`.js-cart-item-container-${productId}`).remove();

        updateCartQuantity();
      });
    });

  document.querySelectorAll<HTMLDivElement>('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;

        if (productId && deliveryOptionId) {
          updateDeliveryOption(productId, deliveryOptionId);
          // MVC: Update data, regenrate all the HTML (Model - View - Controller)
          renderOrderSummary();
        } else {
          console.error(`Missing productId or deliveryOptionId in dataset of element: ${element}`);
        }
      })
    });
}

// --- Initialize Page ---

export function renderOrderSummary(): void {
  renderCartSummary();
  updateCartQuantity();
  setupEventListeners();
}
