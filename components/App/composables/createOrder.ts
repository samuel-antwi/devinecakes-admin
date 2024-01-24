const orderData = ref({
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
