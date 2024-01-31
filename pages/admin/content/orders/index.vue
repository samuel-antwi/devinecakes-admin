<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const orders = ref([]);
const noOrdrs = computed(() => orders.value.length === 0);
</script>
<template>
  <div>
    <app-actions :title="'Orders'" :icon="'i-heroicons-shopping-bag'">
      <template #actions>
        <search-input v-if="orders.length" />
        <app-buttons-create-button />
      </template>
    </app-actions>
    <div v-if="noOrdrs">
      <app-global-empty-content
        description="You have no orders yet."
        :icon="'i-heroicons-shopping-bag'"
        create-link="/admin/content/orders/create"
        button-label="Create Order"
      />
    </div>
    <div class="my-10" v-else>
      <h1>List of content</h1>
    </div>
  </div>
</template>
