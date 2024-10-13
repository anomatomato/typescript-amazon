import{l as r,g as s,p as c,c as e}from"./products-CDbJ0ow7.js";/* empty css                *//* empty css                      */function d(t){const a=s(`.js-added-to-cart-${t}`);return a.classList.add("added-to-cart-visible"),setTimeout(()=>{a.classList.remove("added-to-cart-visible")},2e3)}function o(){const t=e.calculateCartQuantity();s(".js-cart-quantity").innerHTML=t.toString()}function l(){const t=` 
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
          <div class="js-cart-quantity cart-quantity"></div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
    `;s(".js-amazon-header").innerHTML=t}function n(){const t=c.map(a=>`
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${a.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${a.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${a.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${a.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${a.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${a.id}">
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

      ${a.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="js-added-to-cart-${a.id} added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id ="${a.id}">
        Add to Cart
      </button>
    </div>
  `).join("");s(".js-products-grid").innerHTML=t,o(),document.querySelectorAll(".js-add-to-cart").forEach(a=>{a.addEventListener("click",()=>{const{productId:i}=a.dataset;if(!i){console.error(`No Product ID data for button: ${a}`);return}e.addToCart(i),o(),d(i)})})}r(n);l();n();
