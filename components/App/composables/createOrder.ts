import type { OrderType } from "@/types/order";

const orderData = ref<OrderType>({
  paymentReferenceNumber: "",
  paymentStatus: "",
  orderStatus: "",
  cakeType: "",
  description: "",
  deliveryDate: "",
  deliveryMethod: "",
  quantity: "",
  extras: "",
  createdBy: "",
});

export const useCreateOrder = () => {
  return { orderData };
};
