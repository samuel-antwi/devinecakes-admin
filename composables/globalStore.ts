import { FilterMatchMode, FilterOperator } from "primevue/api";
const itemsCount = ref<string[]>([]);
const searchQuery = ref("");
const filters = ref();
const isOpen = ref(false);


export const useGlobalStore = () => {
  const initFilters = () => {
    filters.value = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      "customer.firstName": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "customer.surname": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    };
  };

  initFilters();

  return {
    itemsCount,
    searchQuery,
    filters,
    initFilters,
    isOpen,
  };
};
