const itemsCount = ref<string[]>([]);
const searchQuery = ref("");

export const useGlobalStore = () => {
  const canGoBack = window.history.length > 1;
  return { itemsCount, searchQuery, canGoBack };
};
