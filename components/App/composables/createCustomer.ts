import type { CustomerType } from "@/types/customers";

const formData = ref<CustomerType>({
  salutation: "",
  firstName: "",
  surname: "",
  mobileNumber: "",
  town: "",
  deliveryAddress: "",
  digitalAddress: "",
  streetName: "",
});

export const useCreateCustomer = () => {
  return { formData };
};
