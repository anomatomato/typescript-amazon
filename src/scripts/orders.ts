import dayjs from 'dayjs';
import { cart } from './data/cart-class';
import { Order, orderList } from "./data/orders";
import { getProduct, loadProductsFetch } from './data/products';
import { getElement } from "./utils/dom-utils";
import { renderAmazonHeader } from './utils/header';
import { formatCurrency } from "./utils/money";

function formatOrderDate(dateString: string): string {
  return dayjs(dateString).format('MMMM D');
}

function renderOrdersGrid(): void {
  let html: string = '';

  orderList.orders.forEach((order) => {
    if (!order.products) return;

    html +=
      `
  <div class="order-container">
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${formatOrderDate(order.orderTime)}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(order.totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.id}</div>
      </div>
    </div>
    <div class="order-details-grid">
      ${productsListHTML(order)}
    </div>
  </div>
    `;
  });

  getElement<HTMLDivElement>('.js-orders-grid').innerHTML = html;
}

function productsListHTML(order: Order): string {
  let productsListHTML = '';

  order.products.forEach((orderItem) => {
    const matchingProduct = getProduct(orderItem.productId);
    if (!matchingProduct) return;

    productsListHTML +=
      `
    <div class="product-image-container">
      <img src="${matchingProduct.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${formatOrderDate(orderItem.estimatedDeliveryTime)}
      </div>
      <div class="product-quantity">
        Quantity: ${orderItem.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again-button" 
      data-product-id="${orderItem.productId}">
        <img class="buy-again-icon" src = "images/icons/buy-again.png">
        <span class="buy-again-message"> Buy it again </span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
    `;
  })

  return productsListHTML;
}

function addEventListeners(): void {
  document.querySelectorAll<HTMLButtonElement>('.js-buy-again-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const { productId } = button.dataset;
        if (!productId) {
          console.log(`No productId in dataset of button: ${button}`);
          return;
        }

        cart.addToCart(productId);
        renderAmazonHeader();

        button.innerHTML = '&check; Added';
        setTimeout(() => {
          button.innerHTML = `
            <img class="buy-again-icon" src = "images/icons/buy-again.png">
            <span class="buy-again-message"> Buy it again </span>
          `;
        }, 1000);
      })
    })
}

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error. Try again later.');
  }
  renderAmazonHeader();
  renderOrdersGrid();
  addEventListeners();
}

loadPage();