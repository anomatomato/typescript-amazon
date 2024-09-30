import { getElement } from '../utils/dom-utils.js';
let cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }];
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
function removeFromCart(productId) {
    const newCart = cart.filter((cartItem) => cartItem.productId !== productId);
    cart = newCart;
}
export { cart, handleAddToCart, removeFromCart };
//# sourceMappingURL=cart.js.map