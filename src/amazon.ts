// 57
import { calculateCartQuantity, handleAddToCart } from './data/cart.js';
import { products } from './data/products.js';
import { getElement } from './utils/dom-utils.js';
import { formatCurrency } from './utils/money.js';

// Helper functions

/**
 * Shows the "Added" message after adding a product to cart.
 * @param productId - The ID of the product that was added.
 * @returns A timeout ID that can be cleared with clearTimeout.
 */
function showAddedToCartMessage(productId: string): number {
  const addedMessage = getElement<HTMLDivElement>(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add('added-to-cart-visible');

  return setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible');
  }, 2000);
}

// Handles webpage content, so this function stays here
function updateCartQuantity(): void {
  const cartQuantity: number = calculateCartQuantity();
  getElement('.js-cart-quantity').innerHTML = cartQuantity.toString();
}

// Main logic
const productsHTML: string = products.map((product) =>
  `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="js-added-to-cart-${product.id} added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id ="${product.id}">
        Add to Cart
      </button>
    </div>
  `
).join('');

getElement('.js-products-grid').innerHTML = productsHTML;

updateCartQuantity();

// Add event listener to 'add-to-cart'-button
document.querySelectorAll<HTMLButtonElement>('.js-add-to-cart')
  .forEach((button) => {
    let timeoutId: number;

    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      if (!productId) {
        console.error(`No Product ID data for button: ${button}`);
        return;
      }

      handleAddToCart(productId);
      updateCartQuantity();
      timeoutId = showAddedToCartMessage(productId);
    });
  });
