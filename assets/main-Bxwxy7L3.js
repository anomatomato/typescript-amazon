import{l as s,p as n,g as i,c as e}from"./dom-utils-45v2EbIQ.js";/* empty css                *//* empty css                      */import{r as c}from"./header-CmnpboK3.js";function l(o){const t=i(`.js-added-to-cart-${o}`);return t.classList.add("added-to-cart-visible"),setTimeout(()=>{t.classList.remove("added-to-cart-visible")},2e3)}function d(){const o=e.calculateCartQuantity();i(".js-cart-quantity").innerHTML=o.toString()}function r(){const o=n.map(t=>`
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${t.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${t.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${t.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${t.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${t.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${t.id}">
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

      ${t.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="js-added-to-cart-${t.id} added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id ="${t.id}">
        Add to Cart
      </button>
    </div>
  `).join("");i(".js-products-grid").innerHTML=o,d(),document.querySelectorAll(".js-add-to-cart").forEach(t=>{t.addEventListener("click",()=>{const{productId:a}=t.dataset;if(!a){console.error(`No Product ID data for button: ${t}`);return}e.addToCart(a),d(),l(a)})})}s(r);c();r();
