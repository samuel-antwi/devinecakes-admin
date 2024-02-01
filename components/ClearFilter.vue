<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
const { initFilters } = useGlobalStore();

const clearFilter = () => {
  initFilters();
};
</script>

<template>
  <UButton
    type="button"
    icon="i-heroicons-funnel"
    label="Clear"
    outlined
    @click="clearFilter()"
  />
</template>
