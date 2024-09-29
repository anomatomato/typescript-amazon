export interface Product {
  id: string,
  image: string,
  name: string,
  rating: {
    stars: number,
    count: number
  },
  priceCents: number,
  keywords: string[],
  type?: string,
  sizeChartLink?: string
};

export interface CartProduct {
  productId: string,
  quantity: number
};