import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import { calculateCartQuantity, cart, removeFromCart, updateQuantity } from './data/cart.js';
import { products } from './data/products.js';
import { getElement } from './utils/dom-utils.js';
import { formatCurrency } from './utils/money.js';
hello();
const today = dayjs();
const deliveryDate = today.add(7, 'day');
console.log(deliveryDate.format('dddd, MMMM D'));
// --- Main Functions ---
function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    getElement('.js-return-to-home-link')
        .innerHTML = `${cartQuantity} items`;
}
function saveNewQuantity(productId, newQuantity) {
    if (newQuantity < 0) {
        alert('Quantity must be at least 0');
        return;
    }
    const container = getElement(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
    // Dont update, when newQuantity is NaN or 0
    if (newQuantity) {
        updateQuantity(productId, newQuantity);
        updateCartQuantity();
        getElement(`.js-quantity-label-${productId}`)
            .innerHTML = newQuantity.toString();
    }
}
// --- Render Cart Items ---
function renderCartSummary() {
    let cartSummayHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = products.find((product) => product.id === productId);
        if (!matchingProduct) {
            console.error(`No product found with productId: ${productId}`);
            return;
        }
        cartSummayHTML +=
            `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Wednesday, June 15
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

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    });
    getElement('.js-order-summary').innerHTML = cartSummayHTML;
}
// Add event listeners for all Update links
document.querySelectorAll('.js-update-link')
    .forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        if (!productId) {
            console.error(`No productId in update link: ${link}`);
            return;
        }
        const container = getElement(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
    });
});
document.querySelectorAll('.js-quantity-input')
    .forEach((input) => {
    input.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
            const productId = input.dataset.productId;
            if (!productId) {
                console.error(`No productId in quantity input: ${input}`);
                return;
            }
            const newQuantity = Number(input.value);
            saveNewQuantity(productId, newQuantity);
        }
    });
});
// Add event listeners for all Save links
document.querySelectorAll('.js-save-link')
    .forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        if (!productId) {
            console.error(`No productId in save link: ${link}`);
            return;
        }
        const newQuantity = Number(getElement(`.js-quantity-input-${productId}`).value);
        saveNewQuantity(productId, newQuantity);
    });
});
// Add event listeners for all Delete links
document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
    link.addEventListener('click', (event) => {
        const productId = link.dataset.productId;
        if (!productId) {
            console.error(`No productId data in delete link: ${link}`);
            return;
        }
        removeFromCart(productId);
        getElement(`.js-cart-item-container-${productId}`).remove();
        updateCartQuantity();
    });
});
// --- Initialize Page ---
function init() {
    renderCartSummary();
    updateCartQuantity();
}
init();
//# sourceMappingURL=checkout.js.map