import{c as d,g as r,a as y,b as $,f as s,d as f,e as g,v as j,l as k}from"./products-Bo7-c471.js";/* empty css                */function p(){const t=`
  <div class="checkout-header-left-section">
    <a href="../index.html">
      <img class="amazon-logo" src="images/amazon-logo.png">
      <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
    </a>
  </div>

  <div class="checkout-header-middle-section">
    Checkout (<a class="return-to-home-link js-return-to-home-link"
      href="../index.html">${d.calculateCartQuantity()} items</a>)
  </div>

  <div class="checkout-header-right-section">
    <img src="images/icons/checkout-lock-icon.png">
  </div>
 `;r(".js-header-content").innerHTML=t}function l(){let t=0,i=0;d.cartItems.forEach(n=>{const m=y(n.productId);if(!m)return;t+=m.priceCents*n.quantity;const h=$(n.deliveryOptionId);i+=h.priceCents});const a=t+i,e=a*.1,o=a+e,c=`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${d.calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${s(t)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">$${s(i)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${s(a)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${s(e)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">$${s(o)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;r(".js-payment-summary").innerHTML=c}function v(t,i){if(i<0){alert("Quantity must be at least 0");return}r(`.js-cart-item-container-${t}`).classList.remove("is-editing-quantity"),i&&d.updateQuantity(t,i)}function q(){let t="";d.cartItems.forEach(i=>{const a=i.productId,e=y(a);if(!e)return;const o=i.deliveryOptionId,c=$(o),n=f(c);t+=`
    <div class="cart-item-container 
    js-cart-item-container 
    js-cart-item-container-${e.id}">
      <div class="delivery-date">
        Delivery date: ${n}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${e.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${e.id}">
            ${e.name}
          </div>
          <div class="product-price js-product-price-${e.id}">
            ${e.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${e.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${e.id}">${i.quantity}</span>
            </span>
            <span class="js-update-link update-quantity-link link-primary"
            data-product-id="${e.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${e.id} js-quantity-input" type="number"
            data-product-id=${e.id}>
            <span class="save-quantity-link link-primary js-save-link"
            data-product-id=${e.id}>Save</span>
            <span class="js-delete-link 
            js-delete-link-${e.id} delete-quantity-link link-primary" 
            data-product-id="${e.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${I(e,i)}
        </div>
      </div>
    </div>
  `}),r(".js-order-summary").innerHTML=t}function I(t,i){let a="";return g.forEach(e=>{const o=f(e),c=e.priceCents===0?"FREE":`$${s(e.priceCents)} -`,n=e.id===i.deliveryOptionId;a+=`
      <div class="delivery-option js-delivery-option 
      js-delivery-option-${t.id}-${e.id}"
        data-product-id="${t.id}"
        data-delivery-option-id=${e.id}>
        <input type="radio" 
        ${n?"checked":""}
        class="delivery-option-input js-delivery-option-input-${t.id}-${e.id}"
          name="delivery-option-${t.id}">
        <div>
          <div class="delivery-option-date">
            ${o}
          </div>
          <div class="delivery-option-price">
            ${c} Shipping
          </div>
        </div>
      </div>
    `}),a}function E(){document.querySelectorAll(".js-update-link").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.productId;if(!i){console.error(`No productId in update link: ${t}`);return}r(`.js-cart-item-container-${i}`).classList.add("is-editing-quantity")})}),document.querySelectorAll(".js-quantity-input").forEach(t=>{t.addEventListener("keydown",i=>{if(i.key==="Enter"){const a=t.dataset.productId;if(!a){console.error(`No productId in quantity input: ${t}`);return}const e=Number(t.value);v(a,e),p(),u(),l()}})}),document.querySelectorAll(".js-save-link").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.productId;if(!i){console.error(`No productId in save link: ${t}`);return}const a=Number(r(`.js-quantity-input-${i}`).value);v(i,a),p(),u(),l()})}),document.querySelectorAll(".js-delete-link").forEach(t=>{t.addEventListener("click",i=>{const a=t.dataset.productId;if(!a){console.error(`No productId data in delete link: ${t}`);return}d.removeFromCart(a),p(),u(),l()})}),document.querySelectorAll(".js-delivery-option").forEach(t=>{t.addEventListener("click",()=>{const{productId:i,deliveryOptionId:a}=t.dataset;i&&a&&j.includes(a)?(d.updateDeliveryOption(i,a),u(),l()):console.error(`Missing productId or deliveryOptionId in dataset of element: ${t}`)})})}function u(){q(),E()}k(()=>{p(),u(),l()});
