import{b as Z,c as tt,g as E,a as et,d as nt,f as _,r as ct,u as lt,e as ft}from"./money-1f0Yfm4h.js";/* empty css                */function U(){const i=`
  <div class="checkout-header-left-section">
    <a href="../index.html">
      <img class="amazon-logo" src="${Z}images/amazon-logo.png">
      <img class="amazon-mobile-logo" src="${Z}images/amazon-mobile-logo.png">
    </a>
  </div>

  <div class="checkout-header-middle-section">
    Checkout (<a class="return-to-home-link js-return-to-home-link"
      href="../index.html">${tt()} items</a>)
  </div>

  <div class="checkout-header-right-section">
    <img src="${Z}images/icons/checkout-lock-icon.png">
  </div>
 `;E(".js-header-content").innerHTML=i,console.log("/typescript-amazon/")}var yt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function mt(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var rt={exports:{}};(function(i,d){(function(u,c){i.exports=c()})(yt,function(){var u=1e3,c=6e4,w=36e5,S="millisecond",h="second",D="minute",k="hour",b="day",W="week",M="month",B="quarter",O="year",T="date",R="Invalid Date",at=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,ot=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,dt={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var n=["th","st","nd","rd"],t=s%100;return"["+s+(n[(t-20)%10]||n[t]||n[0])+"]"}},Q=function(s,n,t){var r=String(s);return!r||r.length>=n?s:""+Array(n+1-r.length).join(t)+s},ut={s:Q,z:function(s){var n=-s.utcOffset(),t=Math.abs(n),r=Math.floor(t/60),e=t%60;return(n<=0?"+":"-")+Q(r,2,"0")+":"+Q(e,2,"0")},m:function s(n,t){if(n.date()<t.date())return-s(t,n);var r=12*(t.year()-n.year())+(t.month()-n.month()),e=n.clone().add(r,M),a=t-e<0,o=n.clone().add(r+(a?-1:1),M);return+(-(r+(t-e)/(a?e-o:o-e))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M,y:O,w:W,d:b,D:T,h:k,m:D,s:h,ms:S,Q:B}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return s===void 0}},H="en",C={};C[H]=dt;var G="$isDayjsObject",J=function(s){return s instanceof F||!(!s||!s[G])},z=function s(n,t,r){var e;if(!n)return H;if(typeof n=="string"){var a=n.toLowerCase();C[a]&&(e=a),t&&(C[a]=t,e=a);var o=n.split("-");if(!e&&o.length>1)return s(o[0])}else{var f=n.name;C[f]=n,e=f}return!r&&e&&(H=e),e||!r&&H},m=function(s,n){if(J(s))return s.clone();var t=typeof n=="object"?n:{};return t.date=s,t.args=arguments,new F(t)},l=ut;l.l=z,l.i=J,l.w=function(s,n){return m(s,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var F=function(){function s(t){this.$L=z(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[G]=!0}var n=s.prototype;return n.parse=function(t){this.$d=function(r){var e=r.date,a=r.utc;if(e===null)return new Date(NaN);if(l.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var o=e.match(at);if(o){var f=o[2]-1||0,y=(o[7]||"0").substring(0,3);return a?new Date(Date.UTC(o[1],f,o[3]||1,o[4]||0,o[5]||0,o[6]||0,y)):new Date(o[1],f,o[3]||1,o[4]||0,o[5]||0,o[6]||0,y)}}return new Date(e)}(t),this.init()},n.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},n.$utils=function(){return l},n.isValid=function(){return this.$d.toString()!==R},n.isSame=function(t,r){var e=m(t);return this.startOf(r)<=e&&e<=this.endOf(r)},n.isAfter=function(t,r){return m(t)<this.startOf(r)},n.isBefore=function(t,r){return this.endOf(r)<m(t)},n.$g=function(t,r,e){return l.u(t)?this[r]:this.set(e,t)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(t,r){var e=this,a=!!l.u(r)||r,o=l.p(t),f=function(I,$){var j=l.w(e.$u?Date.UTC(e.$y,$,I):new Date(e.$y,$,I),e);return a?j:j.endOf(b)},y=function(I,$){return l.w(e.toDate()[I].apply(e.toDate("s"),(a?[0,0,0,0]:[23,59,59,999]).slice($)),e)},p=this.$W,v=this.$M,g=this.$D,q="set"+(this.$u?"UTC":"");switch(o){case O:return a?f(1,0):f(31,11);case M:return a?f(1,v):f(0,v+1);case W:var L=this.$locale().weekStart||0,x=(p<L?p+7:p)-L;return f(a?g-x:g+(6-x),v);case b:case T:return y(q+"Hours",0);case k:return y(q+"Minutes",1);case D:return y(q+"Seconds",2);case h:return y(q+"Milliseconds",3);default:return this.clone()}},n.endOf=function(t){return this.startOf(t,!1)},n.$set=function(t,r){var e,a=l.p(t),o="set"+(this.$u?"UTC":""),f=(e={},e[b]=o+"Date",e[T]=o+"Date",e[M]=o+"Month",e[O]=o+"FullYear",e[k]=o+"Hours",e[D]=o+"Minutes",e[h]=o+"Seconds",e[S]=o+"Milliseconds",e)[a],y=a===b?this.$D+(r-this.$W):r;if(a===M||a===O){var p=this.clone().set(T,1);p.$d[f](y),p.init(),this.$d=p.set(T,Math.min(this.$D,p.daysInMonth())).$d}else f&&this.$d[f](y);return this.init(),this},n.set=function(t,r){return this.clone().$set(t,r)},n.get=function(t){return this[l.p(t)]()},n.add=function(t,r){var e,a=this;t=Number(t);var o=l.p(r),f=function(v){var g=m(a);return l.w(g.date(g.date()+Math.round(v*t)),a)};if(o===M)return this.set(M,this.$M+t);if(o===O)return this.set(O,this.$y+t);if(o===b)return f(1);if(o===W)return f(7);var y=(e={},e[D]=c,e[k]=w,e[h]=u,e)[o]||1,p=this.$d.getTime()+t*y;return l.w(p,this)},n.subtract=function(t,r){return this.add(-1*t,r)},n.format=function(t){var r=this,e=this.$locale();if(!this.isValid())return e.invalidDate||R;var a=t||"YYYY-MM-DDTHH:mm:ssZ",o=l.z(this),f=this.$H,y=this.$m,p=this.$M,v=e.weekdays,g=e.months,q=e.meridiem,L=function($,j,Y,P){return $&&($[j]||$(r,a))||Y[j].slice(0,P)},x=function($){return l.s(f%12||12,$,"0")},I=q||function($,j,Y){var P=$<12?"AM":"PM";return Y?P.toLowerCase():P};return a.replace(ot,function($,j){return j||function(Y){switch(Y){case"YY":return String(r.$y).slice(-2);case"YYYY":return l.s(r.$y,4,"0");case"M":return p+1;case"MM":return l.s(p+1,2,"0");case"MMM":return L(e.monthsShort,p,g,3);case"MMMM":return L(g,p);case"D":return r.$D;case"DD":return l.s(r.$D,2,"0");case"d":return String(r.$W);case"dd":return L(e.weekdaysMin,r.$W,v,2);case"ddd":return L(e.weekdaysShort,r.$W,v,3);case"dddd":return v[r.$W];case"H":return String(f);case"HH":return l.s(f,2,"0");case"h":return x(1);case"hh":return x(2);case"a":return I(f,y,!0);case"A":return I(f,y,!1);case"m":return String(y);case"mm":return l.s(y,2,"0");case"s":return String(r.$s);case"ss":return l.s(r.$s,2,"0");case"SSS":return l.s(r.$ms,3,"0");case"Z":return o}return null}($)||o.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(t,r,e){var a,o=this,f=l.p(r),y=m(t),p=(y.utcOffset()-this.utcOffset())*c,v=this-y,g=function(){return l.m(o,y)};switch(f){case O:a=g()/12;break;case M:a=g();break;case B:a=g()/3;break;case W:a=(v-p)/6048e5;break;case b:a=(v-p)/864e5;break;case k:a=v/w;break;case D:a=v/c;break;case h:a=v/u;break;default:a=v}return e?a:l.a(a)},n.daysInMonth=function(){return this.endOf(M).$D},n.$locale=function(){return C[this.$L]},n.locale=function(t,r){if(!t)return this.$L;var e=this.clone(),a=z(t,r,!0);return a&&(e.$L=a),e},n.clone=function(){return l.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},s}(),K=F.prototype;return m.prototype=K,[["$ms",S],["$s",h],["$m",D],["$H",k],["$W",b],["$M",M],["$y",O],["$D",T]].forEach(function(s){K[s[1]]=function(n){return this.$g(n,s[0],s[1])}}),m.extend=function(s,n){return s.$i||(s(n,F,m),s.$i=!0),m},m.locale=z,m.isDayjs=J,m.unix=function(s){return m(1e3*s)},m.en=C[H],m.Ls=C,m.p={},m})})(rt);var pt=rt.exports;const vt=mt(pt),V=[{id:"1",deliveryDays:7,priceCents:0},{id:"2",deliveryDays:3,priceCents:499},{id:"3",deliveryDays:1,priceCents:999}];function it(i){return V.find(u=>u.id===i)||V[0]}function st(i){let d=vt(),u=i.deliveryDays;for(;u>0;)d=d.add(1,"day"),ht(d)||u--;return d.format("dddd, MMMM D")}function ht(i){const d=i.format("dddd");return d==="Saturday"||d==="Sunday"}function A(){let i=0,d=0;et.forEach(h=>{const D=nt(h.productId);if(!D)return;i+=D.priceCents*h.quantity;const k=it(h.deliveryOptionId);d+=k.priceCents});const u=i+d,c=u*.1,w=u+c,S=`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${tt()}):</div>
      <div class="payment-summary-money">$${_(i)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${_(d)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${_(u)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${_(c)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${_(w)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;E(".js-payment-summary").innerHTML=S}function X(i,d){if(d<0){alert("Quantity must be at least 0");return}E(`.js-cart-item-container-${i}`).classList.remove("is-editing-quantity"),d&&ft(i,d)}function $t(){let i="";et.forEach(d=>{const u=d.productId,c=nt(u);if(!c)return;const w=d.deliveryOptionId,S=it(w),h=st(S);i+=`
    <div class="cart-item-container 
    js-cart-item-container-${c.id}">
      <div class="delivery-date">
        Delivery date: ${h}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${c.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${c.name}
          </div>
          <div class="product-price">
            $${_(c.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${c.id}">${d.quantity}</span>
            </span>
            <span class="js-update-link update-quantity-link link-primary"
            data-product-id="${c.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${c.id} js-quantity-input" type="number"
            data-product-id=${c.id}>
            <span class="save-quantity-link link-primary js-save-link"
            data-product-id=${c.id}>Save</span>
            <span class="js-delete-link delete-quantity-link link-primary" data-product-id="${c.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${gt(c,d)}
        </div>
      </div>
    </div>
  `}),E(".js-order-summary").innerHTML=i}function gt(i,d){let u="";return V.forEach(c=>{const w=st(c),S=c.priceCents===0?"FREE":`$${_(c.priceCents)} -`,h=c.id===d.deliveryOptionId;u+=`
      <div class="delivery-option js-delivery-option"
        data-product-id="${i.id}"
        data-delivery-option-id=${c.id}>
        <input type="radio" 
        ${h?"checked":""}
        class="delivery-option-input"
          name="delivery-option-${i.id}">
        <div>
          <div class="delivery-option-date">
            ${w}
          </div>
          <div class="delivery-option-price">
            ${S} Shipping
          </div>
        </div>
      </div>
    `}),u}function Mt(){document.querySelectorAll(".js-update-link").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.productId;if(!d){console.error(`No productId in update link: ${i}`);return}E(`.js-cart-item-container-${d}`).classList.add("is-editing-quantity")})}),document.querySelectorAll(".js-quantity-input").forEach(i=>{i.addEventListener("keydown",d=>{if(d.key==="Enter"){const u=i.dataset.productId;if(!u){console.error(`No productId in quantity input: ${i}`);return}const c=Number(i.value);X(u,c),U(),N(),A()}})}),document.querySelectorAll(".js-save-link").forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.productId;if(!d){console.error(`No productId in save link: ${i}`);return}const u=Number(E(`.js-quantity-input-${d}`).value);X(d,u),U(),N(),A()})}),document.querySelectorAll(".js-delete-link").forEach(i=>{i.addEventListener("click",d=>{const u=i.dataset.productId;if(!u){console.error(`No productId data in delete link: ${i}`);return}ct(u),U(),N(),A()})}),document.querySelectorAll(".js-delivery-option").forEach(i=>{i.addEventListener("click",()=>{const{productId:d,deliveryOptionId:u}=i.dataset;d&&u?(lt(d,u),N(),A()):console.error(`Missing productId or deliveryOptionId in dataset of element: ${i}`)})})}function N(){$t(),Mt()}U();N();A();
