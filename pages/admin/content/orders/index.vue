<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const orders = ref([]);
const noOrdrs = computed(() => orders.value.length === 0);
</script>
<template>
  <UContainer class="py-10">
    <div v-if="noOrdrs">
      <app-global-empty-content
        description="You have no orders yet."
        :icon="'i-heroicons-shopping-bag'"
        create-link="/admin/content/orders/create"
        button-label="Create Order"
      />
    </div>
    <div class="mt-10" v-else>
      <h1>List of content</h1>
    </div>
  </UContainer>
</template>
