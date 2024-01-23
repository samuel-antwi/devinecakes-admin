<script setup lang="ts">
import { columns, people } from "@/data/people";
definePageMeta({
  layout: "auth",
});
const customers = ref(["ghgh"]);
const noCustomers = computed(() => customers.value.length === 0);
</script>
<template>
  <div>
    <app-actions :title="'Customers'" :icon="'i-heroicons-user-group'">
      <template #actions>
        <navigation-create-button />
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
      <app-global-table-list :rows="people" :columns="columns" />
    </div>
  </div>
</template>
