<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
const props = defineProps<{
  rows: any[];
  columns: any[];
}>();

const { itemsCount, searchQuery } = useGlobalStore();

const filteredRows = computed(() => {
  if (!searchQuery.value) {
    return props.rows;
  }

  return props.rows.filter((item) => {
    return Object.values(item).some((value) => {
      return String(value)
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    });
  });
});

watch(
  () => filteredRows.value,
  () => {
    itemsCount.value = filteredRows.value;
  }
);

onMounted(() => {
  itemsCount.value = filteredRows.value;
});
</script>

<template>
  <div>
    <UTable :rows="filteredRows" :columns="columns" />
  </div>
</template>
