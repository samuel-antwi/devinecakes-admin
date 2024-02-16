export type OrderType = {
  paymentReference: string;
  orderNumber: string;
  paymentStatus: string;
  orderStatus?: string;
  cakeType: string;
  description: string;
  deliveryDate: string;
  deliveryMethod: string;
  quantity: string;
  extras?: string;
  createdBy: string;
  customerId: string;
};
