<script setup lang="ts">
import DataTable from "primevue/datatable";
import Calendar from "primevue/calendar";
import Column from "primevue/column";
import type { CustomerType } from "@/types/customers";

const router = useRouter();
const { filters } = useGlobalStore();
definePageMeta({
  layout: "auth",
});

const myInputStyle = ref({
  input:
    "relative disabled:cursor-not-allowed disabled:opacity-75 md:w-[200px] w-[140px] focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
});

const globalFiltersList = [
  "orderDate",
  "paymentReference",
  "customer.firstName",
  "customer.surname",
  "paymentStatus",
  "receivedAmount",
  "balance",
];

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
const columns = [
  { field: "orderDate", header: "Date" },
  { field: "paymentReference", header: "Reference Number" },
  { field: "customerName", header: "Customer" },
  { field: "paymentStatus", header: "Status" },
  { field: "receivedAmount", header: " Received Amout" },
  { field: "balance", header: "Balance" },
];

const items = [
  [
    {
      label: "By Date",
      click: () => {
        getFilterByValue("date");
      },
    },
  ],
];

interface Customer {
  label?: string;
}

const customerList = ref([] as Customer[]);
const selectedField = ref();
const selected = ref();

const filterBy = ref("");
const query = ref("");

const onRowSelect = () => {
  router.push(`/admin/content/customers`);
};

const {
  data: invoice,
  pending,
  refresh,
} = await useAsyncData(
  "invoice",
  () =>
    $fetch(`/api/invoice/invoice`, {
      query: { filter_by: filterBy.value, query: query.value },
    }),
  {
    watch: [query],
  }
);

// Computed properties
const paginator = computed(() => {
  if (invoice?.value) {
    return invoice?.value?.length >= 10;
  }
});

watch(query, (newVal) => {
  if (newVal) {
    router.push({
      path: "/admin/invoices",
      query: { filter_by: filterBy.value, query: query.value },
    });
  }
});

// Get value for customer when filter by customer is selected
watch(
  selected,
  (newVal) => {
    if (newVal) {
      query.value = newVal.label;
    }
  },
  { deep: true }
);

function getFilterByValue(value: string) {
  filterBy.value = value;
  query.value = "";
}

onMounted(() => {
  if (invoice?.value?.length) {
    const customers = invoice?.value?.map((customer: any) => customer.customer);
    const customerOptions = customers.map((customer: CustomerType) => {
      return {
        label: customer.firstName + " " + customer.surname,
      };
    });
    customerList.value = customerOptions;
  }
});

function clearAllFilters() {
  filterBy.value = "";
  query.value = "";
  selected.value = "";
  refresh();
  router.push({
    path: "/admin/invoices",
  });
}
</script>

<template>
  <div>
    <div class="flex lg:hidden items-center mb-4 lg:mb-0 justify-between">
      <navigation-side-drawer />
      <search-input size="md" />
    </div>
    <UDivider class="py-3 md:hidden" />
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <h1 class="md:text-xl text-sm font-medium">
          <span v-show="filterBy === 'all-invoices' || !filterBy"
            >All Invoices</span
          >
          <span v-show="filterBy === 'date'">Date Created</span>
        </h1>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton
            color="white"
            label="Filters"
            trailing-icon="i-heroicons-funnel"
          />
        </UDropdown>
        <Calendar
          :pt="myInputStyle"
          v-if="filterBy === 'date'"
          dateFormat="dd M yy"
          v-model="query"
        />
        <div class="hidden md:block">
          <UButton
            type="button"
            v-if="query"
            @click="clearAllFilters"
            label="Clear All"
          />
        </div>
      </div>
      <search-input class="hidden lg:block" />
    </div>
    <div class="md:hidden flex justify-end">
      <button
        class="bg-primary px-2 py-1 rounded-md text-white text-sm"
        type="button"
        v-if="query"
        @click="clearAllFilters"
      >
        Clear
      </button>
    </div>
    <UDivider class="py-3" />
    <div>
      <div v-if="pending">
        <loading-spinner />
      </div>
      <div v-else class="bg-white md:p-5 mb-10">
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
          :globalFilterFields="globalFiltersList"
        >
          <template #empty> No item found. </template>
          <Column
            style="min-width: 10rem"
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
                <span
                  v-show="
                    col.field === 'receivedAmount' || col.field === 'balance'
                  "
                  >GHS</span
                >
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
