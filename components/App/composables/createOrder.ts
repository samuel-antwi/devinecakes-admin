import type { OrderType } from "@/types/order";

const orderData = ref<OrderType>({
  paymentReference: "",
  paymentStatus: "",
  orderStatus: "not delivered",
  cakeType: "",
  description: "",
  deliveryDate: "",
  deliveryMethod: "",
  quantity: "",
  createdBy: "",
  orderNumber: "",
  customerId: "",
});

export const useCreateOrder = () => {
  return { orderData };
};
