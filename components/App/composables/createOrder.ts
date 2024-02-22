import type { OrderType } from "@/types/order";

const orderData = ref<OrderType>({
  paymentReference: "",
  paymentStatus: "",
  orderStatus: "Pending",
  cakeType: "",
  description: "",
  deliveryDate: "",
  deliveryMethod: "",
  quantity: "",
  createdBy: "",
  orderNumber: "",
  customerId: "",
  amount: "",
});

export const useCreateOrder = () => {
  return { orderData };
};
