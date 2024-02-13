<script setup lang="ts">
import type { CustomerType } from "@/types/customers";

definePageMeta({
  layout: "auth",
});

const route = useRoute();

const id = ref(route.params.id) as Ref<string>;

const {
  pending,
  data: customer,
  refresh,
} = await useFetch<CustomerType>(`/api/customers/${id.value}`, {
  immediate: true,
});
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
