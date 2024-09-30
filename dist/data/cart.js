import { getElement } from '../dom-utils.js';
const cart = [];
function handleAddToCart(productId) {
    const quantitySelector = getElement(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
    // Find matching item, or add if it doesnt exist
    updateCart(productId, quantity);
}
function updateCart(productId, quantity) {
    const matchingItem = cart.find((cartItem) => cartItem.productId === productId);
    if (matchingItem) {
        matchingItem.quantity += quantity;
    }
    else {
        cart.push({
            productId,
            quantity
        });
    }
}
export { cart, handleAddToCart };
//# sourceMappingURL=cart.js.map