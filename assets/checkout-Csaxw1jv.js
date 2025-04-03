import{c as r,g as s,a as v,b as $,f as d,d as h,v as g,e as j,h as k,i as I}from"./dom-utils-DPgjkwYf.js";/* empty css                */import{o as b}from"./orders-DM04ZAuh.js";function m(){const t=`
  <div class="checkout-header-left-section">
    <a href="index.html">
      <img class="amazon-logo" src="images/amazon-logo.png">
      <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
    </a>
  </div>

  <div class="checkout-header-middle-section">
    Checkout (<a class="return-to-home-link js-return-to-home-link"
      href="index.html">${r.calculateCartQuantity()} items</a>)
  </div>

  <div class="checkout-header-right-section">
    <img src="images/icons/checkout-lock-icon.png">
  </div>
 `;s(".js-header-content").innerHTML=t}function l(){let t=0,i=0;r.cartItems.forEach(n=>{const p=v(n.productId);if(!p)return;t+=p.priceCents*n.quantity;const f=$(n.deliveryOptionId);i+=f.priceCents});const a=t+i,e=a*.1,o=a+e,c=`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${r.calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${d(t)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">$${d(i)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${d(a)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${d(e)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">$${d(o)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order-button" ${r.cartItems.length===0?'disabled=""':""}>
      Place your order
    </button>
  `;s(".js-payment-summary").innerHTML=c,s(".js-place-order-button").addEventListener("click",async()=>{try{const p=await(await fetch("https://supersimplebackend.dev/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cart:r.cartItems})})).json();b.addOrder(p)}catch{console.log("Unexpected error. Try again later.")}window.location.href="orders.html"})}function y(t,i){if(i<0){alert("Quantity must be at least 0");return}s(`.js-cart-item-container-${t}`).classList.remove("is-editing-quantity"),i&&r.updateQuantity(t,i)}function q(){s(".js-order-summary").innerHTML=`
      <div class="empty-cart-message">
        Your cart is empty.
      </div>
      <a class="view-products-button button-primary" href=".">
        View products
      </a>
    `}function C(){if(r.cartItems.length<=0){q();return}let t="";r.cartItems.forEach(i=>{const a=i.productId,e=v(a);if(!e)return;const o=i.deliveryOptionId,c=$(o),n=h(c);t+=`
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
          ${E(e,i)}
        </div>
      </div>
    </div>
  `}),s(".js-order-summary").innerHTML=t}function E(t,i){let a="";return j.forEach(e=>{const o=h(e),c=e.priceCents===0?"FREE":`$${d(e.priceCents)} -`,n=e.id===i.deliveryOptionId;a+=`
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
    `}),a}function S(){document.querySelectorAll(".js-update-link").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.productId;if(!i){console.error(`No productId in update link: ${t}`);return}s(`.js-cart-item-container-${i}`).classList.add("is-editing-quantity")})}),document.querySelectorAll(".js-quantity-input").forEach(t=>{t.addEventListener("keydown",i=>{if(i.key==="Enter"){const a=t.dataset.productId;if(!a){console.error(`No productId in quantity input: ${t}`);return}const e=Number(t.value);y(a,e),m(),u(),l()}})}),document.querySelectorAll(".js-save-link").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.productId;if(!i){console.error(`No productId in save link: ${t}`);return}const a=Number(s(`.js-quantity-input-${i}`).value);y(i,a),m(),u(),l()})}),document.querySelectorAll(".js-delete-link").forEach(t=>{t.addEventListener("click",i=>{const a=t.dataset.productId;if(!a){console.error(`No productId data in delete link: ${t}`);return}r.removeFromCart(a),m(),l(),u()})}),document.querySelectorAll(".js-delivery-option").forEach(t=>{t.addEventListener("click",()=>{const{productId:i,deliveryOptionId:a}=t.dataset;i&&a&&g.includes(a)?(r.updateDeliveryOption(i,a),u(),l()):console.error(`Missing productId or deliveryOptionId in dataset of element: ${t}`)})})}function u(){C(),S()}async function L(){try{await Promise.all([k(),I()])}catch(t){console.log(t),console.log("Unexpected error. Please try again later.")}m(),l(),u()}L();
