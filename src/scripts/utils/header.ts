import { cart } from "../data/cart-class";
import { getElement } from "./dom-utils";

export function renderAmazonHeader(): void {
  const headerHTML: string =
    ` 
      <div class="amazon-header-left-section">
        <a href="index.html" class="header-link">
          <img class="amazon-logo" src="images/amazon-logo-white.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile-logo-white.png">
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input class="search-bar" type="text" placeholder="Search">

        <button class="search-button">
          <img class="search-icon" src="images/icons/search-icon.png">
        </button>
      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="js-cart-quantity cart-quantity">${cart.calculateCartQuantity()}</div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
    `;

  getElement<HTMLDivElement>('.js-amazon-header').innerHTML = headerHTML;
}