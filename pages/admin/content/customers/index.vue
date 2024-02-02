<script setup lang="ts">
// import { customers } from "@/data/customers";
definePageMeta({
  layout: "auth",
});

const customerData = ref([]);

const columns = [
  { field: "firstName", header: "First Name" },
  { field: "surname", header: "Surname" },
  { field: "city", header: "Location" },
  { field: "phone", header: "Phone number" },
];

const { data: customers, status } = await useFetch(`/api/customers`);

// const { data: customers } = await useAsyncData("customers", async () => {
//   const { data } = await client.from("customers").select("*");
//   return data;
// });

const noCustomers = computed(() => customers.value?.length === 0);

// const client = useSupabaseClient();

console.log("CUSTOMERS", customers.value);

// onMounted(() => {
//   customerData.value = customers.value;
// });
</script>
<template>
  <div>
    <app-actions :title="'Customers'" :icon="'i-heroicons-user-group'">
      <template #actions>
        <search-input />
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
      <!-- <app-global-table-list :rows="customers" :columns="columns" /> -->
      <pv-table :columns="columns" :value="customers" />
    </div>
  </div>
</template>
