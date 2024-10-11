// Backend = Another computer that manages the data of a website

import { beforeEach, describe, expect, it } from 'vitest';
import { Appliance, Clothing, Product } from '../../src/scripts/data/products';
import { baseURL } from '../../src/scripts/utils/base-url';

describe('test suite: Product class', () => {
  let product: Product;

  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: `${baseURL}images/products/athletic-cotton-socks-6-pairs.jpg`,
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    }
    );
  })

  it('has the correct properties', () => {
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.image).toEqual(`${baseURL}images/products/athletic-cotton-socks-6-pairs.jpg`);
    expect(product.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87
    });
    expect(product.priceCents).toEqual(1090);
    expect(product.keywords).toEqual([
      "socks",
      "sports",
      "apparel"
    ]);
  });

  it('gets the correct stars url', () => {
    expect(product.getStarsUrl()).toEqual(`${baseURL}images/ratings/rating-45.png`)
  });

  it('gets the correct price', () => {
    expect(product.getPrice()).toEqual(`$10.90`);
  })

  it('does not display any extra info', () => {
    expect(product.extraInfoHTML()).toEqual('');
  })
});

describe('test suite: Clothing class', () => {
  let clothing: Clothing;

  beforeEach(() => {
    clothing = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: `${baseURL}images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg`,
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: `${baseURL}images/clothing-size-chart.png`
    });
  });

  it('has the correct properties', () => {
    expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(clothing.image).toEqual(`${baseURL}images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg`);
    expect(clothing.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(clothing.rating).toEqual({
      stars: 4.5,
      count: 56
    });
    expect(clothing.priceCents).toEqual(799);
    expect(clothing.keywords).toEqual([
      "tshirts",
      "apparel",
      "mens"
    ]);
  });

  it('gets the correct stars url', () => {
    expect(clothing.getStarsUrl()).toEqual(`${baseURL}images/ratings/rating-45.png`)
  });

  it('gets the correct price', () => {
    expect(clothing.getPrice()).toEqual(`$7.99`);
  })

  it('displays a size chart link in extraInfoHTML', () => {
    expect(clothing.extraInfoHTML()).toContain(`
      <a href="${baseURL}images/clothing-size-chart.png" target="_blank">
    `);
    expect(clothing.extraInfoHTML()).toContain('Size chart');
  })
});

describe('test suite: Appliance class', () => {
  let appliance: Appliance;

  beforeEach(() => {
    appliance = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: `${baseURL}images/products/black-2-slot-toaster.jpg`,
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliance",
      instructionsLink: `${baseURL}images/appliance-instructions.png`,
      warrantyLink: `${baseURL}images/appliance-warranty.png`
    });
  });

  it('has the correct properties', () => {
    expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
    expect(appliance.image).toEqual(`${baseURL}images/products/black-2-slot-toaster.jpg`);
    expect(appliance.name).toEqual("2 Slot Toaster - Black");
    expect(appliance.rating).toEqual({
      stars: 5,
      count: 2197
    });
    expect(appliance.priceCents).toEqual(1899);
    expect(appliance.keywords).toEqual([
      "toaster",
      "kitchen",
      "appliances"
    ]);
  });

  it('gets the correct stars url', () => {
    expect(appliance.getStarsUrl()).toEqual(`${baseURL}images/ratings/rating-50.png`)
  });

  it('gets the correct price', () => {
    expect(appliance.getPrice()).toEqual(`$18.99`);
  })

  it('displays instructions and a warranty in extraInfoHTML', () => {
    expect(appliance.extraInfoHTML()).toContain(`
      <a href="${baseURL}images/appliance-instructions.png" target="_blank">
    `);
    expect(appliance.extraInfoHTML()).toContain('Instructions');

    expect(appliance.extraInfoHTML()).toContain(`
      <a href="${baseURL}images/appliance-warranty.png" target="_blank">
    `);
    expect(appliance.extraInfoHTML()).toContain('Warranty');
  })
});