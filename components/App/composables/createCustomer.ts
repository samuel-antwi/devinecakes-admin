import type { CustomerType } from "@/types/customers";

const formData = ref<CustomerType>({
  firstName: "",
  surname: "",
  mobileNumber: "",
  location: "",
  deliveryAddress: "",
});

export const useCreateCustomer = () => {
  return { formData };
};
