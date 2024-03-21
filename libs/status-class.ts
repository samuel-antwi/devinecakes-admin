export const statusClass = (data: any) => {
  return [
    "px-3 py-1 capitalize text-sm font-medium shadow rounded-full",
    {
      "bg-yellow-50 text-yellow-700": data === "pending",
      "bg-yellow-50 text-yellow-800": data === "partially paid",
      "bg-green-50 text-green-700": data === "delivered" || data === "paid",
      "bg-red-50 text-red-700": data === "cancelled",
      "bg-red-50 text-red-600": data === "overdue",
      "bg-green-50 text-green-600": data === "refunded",
    },
  ];
};
