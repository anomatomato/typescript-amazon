export interface ProductDetails {
  id: string;
  image: string;
  name: string;
  rating: {
    stars: number;
    count: number
  };
  priceCents: number;
  keywords: string[];
  type?: string;
};

export interface ClothingDetails extends ProductDetails {
  sizeChartLink: string;
}

export interface ApplianceDetails extends ProductDetails {
  instructionsLink: string;
  warrantyLink: string;
}

export type CartProduct = {
  productId: string,
  quantity: number,
  deliveryOptionId: DeliveryOptionId
};

export type DeliveryOption = {
  id: DeliveryOptionId,
  deliveryDays: number,
  priceCents: number
}

export type DeliveryOptionId = '1' | '2' | '3';