import { cart } from '../data/cart-class';
import { getElement } from '../utils/dom-utils';

export function renderCheckoutHeader(): void {
  const headerHTML: string =
    `
  <div class="checkout-header-left-section">
    <a href="index.html">
      <img class="amazon-logo" src="images/amazon-logo.png">
      <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
    </a>
  </div>

  <div class="checkout-header-middle-section">
    Checkout (<a class="return-to-home-link js-return-to-home-link"
      href="index.html">${cart.calculateCartQuantity()} items</a>)
  </div>

  <div class="checkout-header-right-section">
    <img src="images/icons/checkout-lock-icon.png">
  </div>
 `
  getElement<HTMLDivElement>('.js-header-content').innerHTML = headerHTML;
}