<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const columns = [
  { field: "firstName", header: "First Name" },
  { field: "surname", header: "Surname" },
  { field: "town", header: "Town" },
  { field: "mobileNumber", header: "Phone number" },
];

const filters = ["firstName", "surname", "town", "mobileNumber"];

const {
  pending,
  data: customers,
  refresh,
} = await useFetch(`/api/customers/customers`);

onMounted(() => {
  refresh();
});

const noCustomers = computed(() => customers.value?.length === 0);
</script>
<template>
  <div>
    <app-actions :title="'Customers'" :icon="'i-heroicons-user-group'">
      <template #actions>
        <search-input />
        <app-buttons-create-button />
      </template>
    </app-actions>
    <div v-if="pending">
      <h1>Loading</h1>
    </div>
    <div v-else>
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
        <pv-table :columns="columns" :value="customers" :filters="filters" />
      </div>
    </div>
  </div>
</template>
