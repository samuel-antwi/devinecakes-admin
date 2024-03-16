export const statusClass = (data: any) => {
  return [
    "px-2 py-1 capitalize text-sm font-medium shadow rounded-md",
    {
      "bg-yellow-50 text-yellow-700": data === "pending",
      "bg-yellow-50 text-yellow-800": data === "partially paid",
      "bg-green-50 text-green-700": data === "delivered" || data === "paid",
      "bg-red-50 text-red-700": data === "cancelled",
      "bg-red-50 text-red-600": data === "overdue",
    },
  ];
};
