<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type { RealtimeChannel } from "@supabase/supabase-js";

definePageMeta({
  layout: "auth",
});

const { filters } = useGlobalStore();
const selectedField = ref();

const client = useSupabaseClient();

let realtimeChannel: RealtimeChannel;

const columns = [
  { field: "firstName", header: "First Name" },
  { field: "surname", header: "Surname" },
  { field: "town", header: "Town" },
  { field: "mobileNumber", header: "Phone number" },
];

const filtersBold = ["firstName", "surname", "town", "mobileNumber"];

const router = useRouter();
const onRowSelect = () => {
  const id = selectedField.value.id;
  router.push(`/admin/content/customers/${id}`);
};

const {
  data: customers,
  pending,
  refresh: refreshCustomers,
} = await useAsyncData("customers", () => $fetch(`/api/customers/customers`));

const noCustomers = computed(() => customers.value?.length === 0);

onMounted(() => {
  realtimeChannel = client
    .channel("public:customers")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "customers" },
      () => refreshCustomers()
    );

  realtimeChannel.subscribe();
});

onUnmounted(() => {
  client.removeChannel(realtimeChannel);
});
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
      <loading-spinner />
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
        <!-- <pv-table
          :columns="columns"
          :value="customers"
          :filters="filtersBold"
          @get-customer="onRowSelect"
        /> -->

        <ClientOnly>
          <DataTable
            ref="dt"
            v-model:filters="filters"
            sortMode="multiple"
            :value="customers"
            paginator
            :rows="10"
            dataKey="id"
            filterDisplay="menu"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            :globalFilterFields="filtersBold"
            v-model:selection="selectedField"
            selectionMode="single"
            @rowSelect="onRowSelect"
          >
            <template #empty> No item found. </template>
            <template #loading> Loading customers data. Please wait. </template>

            <Column
              sortable
              v-for="col of columns"
              :key="col.field"
              :field="col.field"
              :header="col.header"
            >
            </Column>
          </DataTable>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
