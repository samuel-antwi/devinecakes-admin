import type { RouteConfigType } from "~/types/global";

export const routeConfig: RouteConfigType = {
  "admin-content-orders": { title: "Orders", icon: "i-heroicons-shopping-bag" },
  "admin-content-customers": { title: "Customers", icon: "i-heroicons-users" },
  "admin-content-customers-create": {
    title: "Customers",
    icon: "i-heroicons-users",
  },
  "admin-users": { title: "User Directory", icon: "i-heroicons-users" },
  "admin-users-create": { title: "User Directory", icon: "i-heroicons-users" },
  "admin-users-roles-id": { title: "Administrator", icon: "i-heroicons-users" },
  "admin-users-roles-id-create": {
    title: "Administrator",
    icon: "i-heroicons-users",
  },

  default: { title: "Orders", icon: "i-heroicons-shopping-bag" },
};
