<script setup lang="ts">
import type { CustomerType } from "@/types/customers";

definePageMeta({
  layout: "auth",
});

const route = useRoute();

const id = route.params.id;

const {
  pending,
  data: customer,
  refresh,
} = await useFetch<CustomerType>(`/api/customers/${id}`);
</script>
<template>
  <div>
    <div v-if="pending">
      <h1>Loading...</h1>
    </div>
    <div v-else>
      <customers-header :customer="customer" class="mb-4" />
      <customers-customer-tabs :customer="customer" />
    </div>
  </div>
</template>
