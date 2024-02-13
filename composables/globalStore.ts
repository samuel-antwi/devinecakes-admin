import { FilterMatchMode, FilterOperator } from "primevue/api";
const itemsCount = ref<string[]>([]);
const searchQuery = ref("");
const filters = ref();
const isOpen = ref(false);

export const useGlobalStore = () => {
  const initFilters = () => {
    filters.value = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
  };

  initFilters();

  return { itemsCount, searchQuery, filters, initFilters, isOpen };
};
