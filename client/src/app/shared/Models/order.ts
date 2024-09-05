export interface Order {
  id: number;
  orderDate: string;
  buyerEmail: string;
  shipToAddress: ShipToAddress;
  deliveryMethod: string;
  shippingPrice: number;
  paymentSummary: PaymentSummary;
  orderItems: OrderItem[];
  subtotal: number;
  discount?: number;
  status: string;
  total: number;
  paymentIntentId: string;
}

export interface ShipToAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentSummary {
  last4: number;
  brand: string;
  expMonth: number;
  expYear: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}

export interface OrderToCreate {
  cartId: string;
  deliveryMethodId: number;
  shippingAddress: ShipToAddress;
  paymentSummary: PaymentSummary;
  discount?: number;
}
