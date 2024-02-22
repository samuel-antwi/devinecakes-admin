export const statusClass = (data: any) => {
  return [
    "px-2 py-1 capitalize text-base font-medium shadow rounded-md",
    {
      "bg-yellow-50 text-yellow-700": data === "pending",
      "bg-blue-50 text-blue-700": data === "delivered",
      "bg-red-50 text-red-700": data === "cancelled",
    },
  ];
};
