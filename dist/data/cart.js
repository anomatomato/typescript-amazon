import { getElement } from '../utils/dom-utils.js';
let cart = loadCartFromStorage();
function handleAddToCart(productId) {
    const quantitySelector = getElement(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
    // Find matching item, or add if it doesnt exist
    addQuantity(productId, quantity);
}
function addQuantity(productId, quantity) {
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
    saveCartToStorage();
}
function updateQuantity(productId, newQuantity) {
    const matchingItem = cart.find((cartItem) => cartItem.productId === productId);
    if (matchingItem) {
        matchingItem.quantity = newQuantity;
    }
    else {
        cart.push({
            productId,
            quantity: newQuantity
        });
    }
    saveCartToStorage();
}
function removeFromCart(productId) {
    const newCart = cart.filter((cartItem) => cartItem.productId !== productId);
    cart = newCart;
    saveCartToStorage();
}
function calculateCartQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function loadCartFromStorage() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart) {
        cart =
            [{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1
                }];
    }
    return cart;
}
export { calculateCartQuantity, cart, handleAddToCart, removeFromCart, updateQuantity };
//# sourceMappingURL=cart.js.map