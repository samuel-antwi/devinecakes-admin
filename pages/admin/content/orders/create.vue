<script setup lang="ts">
import type { CustomerType } from "~/types/customers";

definePageMeta({
  layout: "auth",
});

const { data: customers } = await useFetch<CustomerType>(
  `/api/customers/customers`
);
</script>
<template>
  <div>
    <app-actions
      :title="'Creating an Order'"
      :icon="'i-heroicons-shopping-bag'"
      :can-go-back="true"
    >
      <template #actions>
        <app-buttons-save-button />
      </template>
    </app-actions>
    <div class="mb-10">
      <orders-create-order :customers="customers" />
    </div>
  </div>
</template>
