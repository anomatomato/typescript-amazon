import { renderCheckoutHeader } from './checkout/checkoutHeader';
import { renderOrderSummary } from './checkout/orderSummary';
import { renderPaymentSummary } from './checkout/paymentSummary';
import { loadProducts } from './data/products';
// import './data/backend-practice';

loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});