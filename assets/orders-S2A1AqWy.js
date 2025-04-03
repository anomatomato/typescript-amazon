import{h as s,f as c,g as o,c as n,j as l,a as u}from"./dom-utils-DPgjkwYf.js";/* empty css                *//* empty css                      */import{o as v}from"./orders-DM04ZAuh.js";import{r as d}from"./header-BSHGgHe7.js";function e(a){return l(a).format("MMMM D")}function g(){let a="";v.orders.forEach(r=>{r.products&&(a+=`
  <div class="order-container">
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${e(r.orderTime)}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${c(r.totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${r.id}</div>
      </div>
    </div>
    <div class="order-details-grid">
      ${m(r)}
    </div>
  </div>
    `)}),o(".js-orders-grid").innerHTML=a}function m(a){let r="";return a.products.forEach(i=>{const t=u(i.productId);t&&(r+=`
    <div class="product-image-container">
      <img src="${t.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${t.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${e(i.estimatedDeliveryTime)}
      </div>
      <div class="product-quantity">
        Quantity: ${i.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again-button" 
      data-product-id="${i.productId}">
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
    `)}),r}function p(){document.querySelectorAll(".js-buy-again-button").forEach(a=>{a.addEventListener("click",()=>{const{productId:r}=a.dataset;if(!r){console.log(`No productId in dataset of button: ${a}`);return}n.addToCart(r),d(),a.innerHTML="&check; Added",setTimeout(()=>{a.innerHTML=`
            <img class="buy-again-icon" src = "images/icons/buy-again.png">
            <span class="buy-again-message"> Buy it again </span>
          `},1e3)})})}async function y(){try{await s()}catch{console.log("Unexpected error. Try again later.")}d(),g(),p()}y();
