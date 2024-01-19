<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const orders = ref([]);
const noOrdrs = computed(() => orders.value.length === 0);
</script>
<template>
  <div v-if="noOrdrs" class="py-10">
    <app-global-empty-content
      description="You have no orders yet."
      :icon="'i-heroicons-shopping-bag'"
      create-link="/admin/content/orders/create"
      button-label="Create Order"
    />
  </div>
</template>
