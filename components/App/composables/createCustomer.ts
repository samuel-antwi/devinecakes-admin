const formData = ref({
  firstName: "",
  surname: "",
  mobileNumber: "",
  location: "",
});

export const useCreateCustomer = () => {
  return { formData };
};
