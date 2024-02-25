import type { OrderType } from "@/types/order";

const orderData = ref<OrderType>({
  paymentReference: "",
  paymentStatus: "",
  orderStatus: "pending",
  cakeType: "",
  description: "",
  deliveryDate: "",
  deliveryMethod: "",
  quantity: "",
  createdBy: "",
  orderNumber: "",
  customerId: "",
  amount: 0,
});

export const useCreateOrder = () => {
  return { orderData };
};
