export interface IOrderResponse {
  id: string;
  quantity: number;
  totalPrice: string;
  createdAt: string;
  user: {
    name: string;
  };
  product: {
    name: string;
  };
}
