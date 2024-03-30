import type { CustomerType } from "./customers";

export type OrderType = {
  id?: string;
  paymentReference: string;
  orderNumber: string;
  paymentStatus: string;
  orderDate?: string;
  orderStatus?: string;
  cakeType: string;
  description: string;
  deliveryDate: string;
  deliveryMethod: string;
  quantity:  number;
  extras?: string;
  createdBy: string;
  customerId: string;
  amount?: number;
  receivedAmount?: number;
  balance?: number;
  price?: number;
  total?: number;
  customer?: CustomerType | null;
  createdAt: string;
  updatedAt: string;
};
