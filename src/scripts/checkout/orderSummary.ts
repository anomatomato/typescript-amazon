import { getElement } from '..//utils/dom-utils';
import { cart, removeFromCart, updateDeliveryOption, updateQuantity } from '../data/cart';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../data/deliveryOptions';
import { getProduct } from '../data/products';
import { CartProduct, DeliveryOption, Product } from '../types';
import { formatCurrency } from '../utils/money';
import { renderCheckoutHeader } from './checkoutHeader';
import { renderPaymentSummary } from './paymentSummary';

// --- Main Functions ---

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
  }
}

// --- Render Cart Items ---
function renderCartSummary(): void {
  let cartSummayHTML: string = '';

  cart.forEach((cartItem) => {
    const productId: string = cartItem.productId;

    const matchingProduct: Product | undefined = getProduct(productId);
    if (!matchingProduct) {
      return;
    }

    const deliveryOptionId: string = cartItem.deliveryOptionId;
    const deliveryOption: DeliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString: string = calculateDeliveryDate(deliveryOption);

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
    const dateString: string = calculateDeliveryDate(deliveryOption);

    const priceString: string = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;


    const isChecked: boolean = deliveryOption.id === cartItem.deliveryOptionId;

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

          renderCheckoutHeader();
          renderOrderSummary();
          renderPaymentSummary();
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

        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
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

        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
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
          renderPaymentSummary();
        } else {
          console.error(`Missing productId or deliveryOptionId in dataset of element: ${element}`);
        }
      })
    });
}

// --- Initialize Page ---

function renderOrderSummary(): void {
  renderCartSummary();
  setupEventListeners();
}

export {
  renderOrderSummary
};

