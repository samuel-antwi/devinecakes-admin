<script setup lang="ts">
import type { OrderType } from "@/types/order";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
definePageMeta({
  layout: "auth",
});

const filtersBold = ["firstName", "surname", "town", "mobileNumber"];
const statusClass = (data: any) => {
  return [
    "px-2 py-1 capitalize text-sm font-medium shadow rounded-md",
    {
      "bg-green-50 text-green-700": data === "paid" || data === "part paid",
      "bg-red-50 text-red-700": data === "cancelled",
    },
  ];
};

const { filters } = useGlobalStore();
const selectedField = ref();

const router = useRouter();
const onRowSelect = () => {
  const id = selectedField.value.id;
  router.push(`/admin/content/customers/${id}`);
};

const route = useRoute();
console.log(route.query);

const {
  data: invoice,
  pending,
  refresh: refreshInvoice,
} = await useAsyncData<OrderType[]>("invoice", () =>
  $fetch(`/api/invoice/invoice?${route.query}`)
);

const columns = [
  { field: "orderDate", header: "Date" },
  { field: "paymentReference", header: "Reference Number" },
  { field: "customerName", header: "Customer" },
  { field: "paymentStatus", header: "Status" },
  { field: "receivedAmount", header: " Received Amout" },
];

const paginator = computed(() => {
  return Boolean(invoice?.value?.length > 10);
});
</script>

<template>
  <div>
    <h1 class="text-xl font-medium">All Invoices</h1>
    <UDivider class="py-3" />
    <div>
      <div v-if="pending">
        <loading-spinner />
      </div>
      <div v-else>
        <DataTable
          ref="dt"
          v-model:filters="filters"
          sortMode="multiple"
          :value="invoice"
          :paginator="paginator || false"
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

          <Column v-for="col of columns" :key="col.field" :header="col.header">
            <template #body="slotProps">
              <span
                v-if="col.field === 'orderDate' || col.field === 'deliveryDate'"
              >
                {{ formatDate(slotProps.data[col.field]) }}
              </span>
              <div v-else>
                <span v-if="col.field === 'customerName'">
                  {{ slotProps.data.customer?.salutation }}.
                  {{ slotProps.data.customer.firstName }}
                  {{ slotProps.data.customer.surname }}
                </span>
                <span v-show="col.field === 'receivedAmount'">GHS</span>
                <span v-if="col.field === 'paymentStatus'">
                  <UBadge
                    :ui="{ rounded: 'rounded-full' }"
                    :class="statusClass(slotProps.data[col.field])"
                  >
                    <span class="capitalize">
                      {{ slotProps.data[col.field] }}</span
                    >
                  </UBadge>
                </span>
                <span v-else>{{ slotProps.data[col.field] }}</span>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
