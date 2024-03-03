// Assuming getFilterByValue is available in this context or passed as a prop/handler
const getFilterByValue = (value: string) => {
  return value;
};

export const items = [
  { label: "All Invoices", value: "all-invoices" },
  { label: "By Date", value: "by-date" },
  { label: "Status", value: "status" },
  { label: "Customer", value: "customer" },
  { label: "Reference #", value: "payment-reference" },
].map((item) => ({
  ...item,
  click: () => getFilterByValue(item.value),
}));
