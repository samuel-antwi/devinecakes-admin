<script setup lang="ts">
import DataTable from "primevue/datatable";
import Calendar from "primevue/calendar";
import Column from "primevue/column";
import moment from "moment";
import type { CustomerType } from "@/types/customers";

const route = useRoute();
const router = useRouter();

const { filters } = useGlobalStore();
definePageMeta({
  layout: "auth",
});

const myInputStyle = ref({
  input:
    "relative disabled:cursor-not-allowed text-sm disabled:opacity-75 w-[200px] focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-xl px-3.5 py-1 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
});

const globalFiltersList = [
  "orderDate",
  "paymentReference",
  "customer.firstName",
  "customer.surname",
  "paymentStatus",
  "receivedAmount",
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
];

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

interface Customer {
  label?: string;
}

const customerList = ref([] as Customer[]);
const selectedField = ref();
const selected = ref();
const queryParams = ref({
  filterBy: "",
  query: "",
});

const onRowSelect = () => {
  router.push(`/admin/content/customers`);
};

const { data: invoice, pending } = await useAsyncData("invoice", () =>
  $fetch(`/api/invoice/invoice`, {
    query: { filter_by: route.query.filter_by, query: route.query.query },
  })
);

// Computed properties
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

// Get value for customer when filter by customer is selected
watch(
  selected,
  (newVal) => {
    if (newVal) {
      queryParams.value.query = newVal.label;
    }
  },
  { deep: true }
);

function getFilterByValue(value: string) {
  queryParams.value.filterBy = value;
  queryParams.value.query = "";
}

onMounted(() => {
  if (invoice?.value?.length) {
    const customers = invoice?.value?.map((customer: any) => customer.customer);
    const customerOptions = customers.map((customer: CustomerType) => {
      return {
        label:
          customer.salutation +
          " " +
          customer.firstName +
          " " +
          customer.surname,
      };
    });
    customerList.value = customerOptions;
  }
});

function clearAllFilters() {
  queryParams.value.filterBy = "";
  queryParams.value.query = "";
  selected.value = "";
  router.push({
    path: "/admin/invoices",
    query: { filter_by: "all-invoice", query: "all" },
  });
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div
        class="md:flex flex-col md:flex-row space-y-3 md:space-y-0 items-center space-x-4"
      >
        <h1 class="text-xl ml-4 md:ml-0 font-medium">
          <span
            v-show="
              queryParams.filterBy === 'all-invoices' || !queryParams.filterBy
            "
            >All Invoices</span
          >
          <span v-show="queryParams.filterBy === 'date'">Date Created</span>
          <span v-show="queryParams.filterBy === 'status'">Status</span>
          <span v-show="queryParams.filterBy === 'customer'">Customer</span>
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
        <div v-if="queryParams.filterBy === 'customer'">
          <USelectMenu
            id="customer"
            size="sm"
            searchable
            searchable-placeholder="Search a person..."
            placeholder="Select customer"
            :options="customerList"
            v-model="selected"
          />
        </div>
        <UButton
          v-if="queryParams.query || queryParams.filterBy"
          @click="clearAllFilters"
          label="Clear All"
        />
      </div>
      <search-input />
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
          :globalFilterFields="globalFiltersList"
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
