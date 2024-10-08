export type Product = {
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

export type CartProduct = {
  productId: string,
  quantity: number,
  deliveryOptionId: string
};

export type DeliveryOption = {
  id: string,
  deliveryDays: number,
  priceCents: number
}