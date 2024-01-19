<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const customers = ref([]);
const noCustomers = computed(() => customers.value.length === 0);
</script>
<template>
  <div v-if="noCustomers" class="py-10">
    <app-global-empty-content
      description="You have no orders yet."
      :icon="'i-heroicons-shopping-bag'"
      create-link="/admin/content/customers/create"
      button-label="Add Customer"
    />
  </div>
</template>
