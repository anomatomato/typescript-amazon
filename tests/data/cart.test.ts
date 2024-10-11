import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cart } from '../../src/scripts/data/cart-class';
import { CartProduct } from '../../src/scripts/types';


describe('test suite: handleAddToCart', () => {
  const productId: string = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const mockCart: CartProduct[] = [{
    productId,
    quantity: 1,
    deliveryOptionId: '1'
  }]

  beforeEach(() => {
    // Mock DOM element for quantity selector
    const quantitySelector = document.createElement('select');
    quantitySelector.className = `js-quantity-selector-${productId}`;
    quantitySelector.innerHTML =
      `
      <option value="1">1</option>
      <option value="2" selected>2</option>
    `;
    document.body.appendChild(quantitySelector);

    vi.spyOn(localStorage, 'setItem').mockImplementation(vi.fn());
  })

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('adds an existing product to the cart', () => {
    cart.cartItems = mockCart.map((item) => ({ ...item }));

    cart.addToCart(productId);

    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId,
      quantity: 3,
      deliveryOptionId: '1'
    }]));
    expect(cart.cartItems[0].productId).toEqual(productId);
    expect(cart.cartItems[0].quantity).toEqual(3);
  });

  it('adds a new product to the cart', () => {
    cart.cartItems = [];

    cart.addToCart(productId);

    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId,
      quantity: 2,
      deliveryOptionId: '1'
    }]));
    expect(cart.cartItems[0].productId).toEqual(productId);
    expect(cart.cartItems[0].quantity).toEqual(2);
  });
});

describe('test suite: removeFromCart', () => {
  const productId: string = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const mockCart: CartProduct[] = [{
    productId,
    quantity: 1,
    deliveryOptionId: '1'
  }]

  beforeEach(() => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(vi.fn(() => {

    }))
    cart.cartItems = mockCart.map((item) => ({ ...item }));
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('remove an existing product from the cart', () => {
    cart.removeFromCart(productId);

    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  })
  it('remove a non-existing product from the cart', () => {
    cart.removeFromCart(productId + 'random');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId);
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(mockCart));
  })
});

describe('test suite: updateDeliveryOption', () => {
  const productId: string = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const mockCart: CartProduct[] = [{
    productId,
    quantity: 1,
    deliveryOptionId: '1'
  }]

  beforeEach(() => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(vi.fn())
    cart.cartItems = mockCart.map((item) => ({ ...item }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('updates delivery option of an existing product in the cart', () => {
    cart.updateDeliveryOption(productId, '2');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId);
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId,
      quantity: 1,
      deliveryOptionId: '2'
    }]));
  });

  it('does nothing when product is not in the cart', () => {
    cart.cartItems = mockCart;
    cart.updateDeliveryOption('non existing productID', '3');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId);
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing when deliveryOptionId is invalid', () => {
    // @ts-ignore
    cart.updateDeliveryOption(productId, '4');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId);
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});