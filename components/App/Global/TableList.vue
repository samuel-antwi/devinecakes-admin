<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
const props = defineProps<{
  rows: any[];
  columns: any[];
}>();

const selected = ref([]);

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

const items = (row: any) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];
function select(row) {
  const index = selected.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}
</script>

<template>
  <div>
    <UTable
      v-model="selected"
      :rows="filteredRows"
      :columns="columns"
      @select="select"
    >
    </UTable>
  </div>
</template>
