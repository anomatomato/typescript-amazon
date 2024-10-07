import{p as o,b as t,f as n,g as i,h as r,c}from"./money-1f0Yfm4h.js";/* empty css                *//* empty css                      */function d(a){const s=i(`.js-added-to-cart-${a}`);return s.classList.add("added-to-cart-visible"),setTimeout(()=>{s.classList.remove("added-to-cart-visible")},2e3)}function e(){const a=c();i(".js-cart-quantity").innerHTML=a.toString()}function l(){const a=` 
      <div class="amazon-header-left-section">
        <a href="index.html" class="header-link">
          <img class="amazon-logo" src="${t}images/amazon-logo-white.png">
          <img class="amazon-mobile-logo" src="${t}images/amazon-mobile-logo-white.png">
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input class="search-bar" type="text" placeholder="Search">

        <button class="search-button">
          <img class="search-icon" src="${t}images/icons/search-icon.png">
        </button>
      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="${t}src/orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="${t}src/checkout.html">
          <img class="cart-icon" src="${t}images/icons/cart-icon.png">
          <div class="js-cart-quantity cart-quantity"></div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
    `;i(".js-amazon-header").innerHTML=a}l();const p=o.map(a=>`
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
          src="${t}images/ratings/rating-${a.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
          ${a.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${n(a.priceCents)}
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

      <div class="product-spacer"></div>

      <div class="js-added-to-cart-${a.id} added-to-cart">
        <img src="${t}images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id ="${a.id}">
        Add to Cart
      </button>
    </div>
  `).join("");i(".js-products-grid").innerHTML=p;e();document.querySelectorAll(".js-add-to-cart").forEach(a=>{a.addEventListener("click",()=>{const{productId:s}=a.dataset;if(!s){console.error(`No Product ID data for button: ${a}`);return}r(s),e(),d(s)})});
