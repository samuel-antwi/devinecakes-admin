import type { OrderType } from "@/types/order";

const orderData = ref<OrderType>({
  paymentReference: "",
  paymentStatus: "",
  orderStatus: "pending",
  cakeType: "",
  description: "",
  deliveryDate: "",
  deliveryMethod: "",
  quantity: 0,
  createdBy: "",
  orderNumber: "",
  customerId: "",
  amount: 0,
  receivedAmount: 0,
  balance: 0,
  price: 0,
  total: 0,
});

export const useCreateOrder = () => {
  const canCreateOrder = computed(() => {
    return Boolean(
      orderData.value.customerId &&
        orderData.value.cakeType.length > 0 &&
        orderData.value.price &&
        orderData.value.paymentStatus &&
        orderData.value.deliveryDate
    );
  });
  return { orderData, canCreateOrder };
};
