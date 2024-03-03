<script setup lang="ts">
import type { OrderType } from "@/types/order";
import DataTable from "primevue/datatable";
import Calendar from "primevue/calendar";
import Column from "primevue/column";
import moment from "moment";
definePageMeta({
  layout: "auth",
});

const items = [
  [
    {
      label: "All Invoices",
      click: () => {
        getFilterByValue("all-invoices");
      },
    },
  ],
  [
    {
      label: "By Date",
      click: () => {
        getFilterByValue("date");
      },
    },
  ],
  [
    {
      label: "Status",
      click: () => {
        getFilterByValue("status");
      },
    },
  ],
  [
    {
      label: "Customer",
      click: () => {
        getFilterByValue("customer");
      },
    },
  ],
  [
    {
      label: "Reference #",
      click: () => {
        getFilterByValue("payment-reference");
      },
    },
  ],
];

const route = useRoute();
// console.log(route.query);

const statusClass = (data: any) => {
  return [
    "px-2 py-1 capitalize text-sm font-medium shadow rounded-md",
    {
      "bg-green-50 text-green-700":
        data === "paid" || data === "partially paid",
      "bg-red-50 text-red-700": data === "cancelled",
    },
  ];
};

// console.log("QUERY", route.query);

const { filters } = useGlobalStore();
const selectedField = ref();
const queryParams = ref({
  filterBy: "",
  query: "",
});

const date = ref();

const router = useRouter();
const onRowSelect = () => {
  const id = selectedField.value.id;
  router.push(`/admin/content/customers`);
};

const { data: invoice, pending } = await useAsyncData("invoice", () =>
  $fetch(`/api/invoice/invoice`, {
    query: { filter_by: route.query.filter_by, query: route.query.query },
  })
);

const columns = [
  { field: "orderDate", header: "Date" },
  { field: "paymentReference", header: "Reference Number" },
  { field: "customerName", header: "Customer" },
  { field: "paymentStatus", header: "Status" },
  { field: "receivedAmount", header: " Received Amout" },
];

const paginator = computed(() => {
  if (invoice?.value) {
    return invoice?.value?.length > 10;
  }
});

watch(
  queryParams,
  (newVal) => {
    if (newVal.filterBy === "all-invoices") {
      router.push({
        path: "/admin/invoices",
        query: { filter_by: "all-invoice", query: "all" },
      });
    }
    if (newVal.filterBy && newVal.query) {
      router.push({
        path: "/admin/invoices",
        query: { filter_by: newVal.filterBy, query: newVal.query },
      });
    }
  },
  { deep: true }
);

function getFilterByValue(value: string) {
  queryParams.value.filterBy = value;
  queryParams.value.query = "";
}
</script>

<template>
  <div>
    <div class="flex items-center space-x-4">
      <h1 class="text-xl font-medium">All Invoices</h1>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton
          color="white"
          label="Filters"
          trailing-icon="i-heroicons-funnel"
        />
      </UDropdown>
      <Calendar
        v-if="queryParams.filterBy === 'date'"
        dateFormat="dd M yy"
        v-model="queryParams.query"
      />
      <div v-if="queryParams.filterBy === 'status'">
        <USelect
          placeholder="Select status"
          v-model="queryParams.query"
          :options="['Paid', 'Partially Paid', 'Not Paid']"
        />
      </div>
    </div>
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
          v-model:selection="selectedField"
          selectionMode="single"
          @rowSelect="onRowSelect"
        >
          <template #empty> No item found. </template>
          <template #loading> Loading customers data. Please wait. </template>

          <Column
            v-for="col of columns"
            :key="col.field"
            :header="col.header"
            :filterField="col.field === 'orderDate' ? 'date' : ''"
            :dataType="col.field === 'orderDate' ? 'date' : ''"
          >
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
