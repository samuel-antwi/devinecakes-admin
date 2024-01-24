<script setup lang="ts">
import { columns, customers } from "@/data/customers";
definePageMeta({
  layout: "auth",
});

const noCustomers = computed(() => customers.length === 0);
</script>
<template>
  <div>
    <app-actions :title="'Customers'" :icon="'i-heroicons-user-group'">
      <template #actions>
        <app-search-input />
        <app-buttons-create-button />
      </template>
    </app-actions>
    <div v-if="noCustomers">
      <app-global-empty-content
        description="You have no orders yet."
        :icon="'i-heroicons-user-group'"
        create-link="/admin/content/customers/create"
        button-label="Add Customer"
      />
    </div>
    <div v-else>
      <app-global-table-list :rows="customers" :columns="columns" />
    </div>
  </div>
</template>
