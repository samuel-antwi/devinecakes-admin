const itemsCount = ref<string[]>([]);
const searchQuery = ref("");
export const useGlobalStore = () => {
  return { itemsCount, searchQuery };
};
