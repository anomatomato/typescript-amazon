import { renderCheckoutHeader } from './checkout/checkoutHeader';
import { renderOrderSummary } from './checkout/orderSummary';
import { renderPaymentSummary } from './checkout/paymentSummary';
import { loadCart } from './data/cart-class';
import { loadProductsFetch } from './data/products';
// import './data/backend-practice';

Promise.all([
  loadProductsFetch(),
  new Promise<void>((resolve) => {
    loadCart(() => {
      resolve();
    })
  })

]).then((values) => {
  console.log(values)
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise<string>((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise<void>((resolve) => {
    loadCart(() => {
      resolve();
    })
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  })
});
*/