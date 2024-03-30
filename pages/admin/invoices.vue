<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type { CustomerType } from "@/types/customers";
import { statusClass } from "@/libs/status-class";
import moment from "moment";

const router = useRouter();
const { filters } = useGlobalStore();
definePageMeta({
  layout: "auth",
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

const columns = [
  { field: "paymentReference", header: "Invoive #" },
  { field: "orderDate", header: "Date" },
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
const route = useRoute();
const selected = ref("");
const filterBy = ref(route?.query?.filter_by || "");
const query = ref(route?.query?.query || "");
const initialQuery = route?.query?.query || "";

const onRowSelect = () => {
  router.push(`/admin/content/orders/${selectedField.value.id}`);
};

const { data: invoice, pending } = await useAsyncData(
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

function getFilterByValue(value: string) {
  filterBy.value = value;
  query.value = "";
}

onMounted(() => {
  if (filterBy.value === "date" && initialQuery) {
    query.value = moment(initialQuery, "YYYY-MM-DD").format("DD MMM YYYY");
  }
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
</script>

<template>
  <div>
    <div
      class="flex lg:hidden px-4 lg:px-8 items-center mb-4 lg:mb-0 justify-between"
    >
      <navigation-side-drawer />
      <search-input size="md" />
    </div>
    <UDivider class="py-3 md:hidden" />
    <div class="flex px-4 lg:px-8 items-center justify-between">
      <global-filters
        :label="'Invoices'"
        :url="'/admin/invoices'"
        :filter-label="filterBy === 'date' ? 'Date Created' : 'All Invoices'"
        :items
        v-model:filter-by="filterBy"
        v-model:query="query"
        v-model:initial-query="initialQuery"
        v-model:selected="selected"
      />
      <search-input class="hidden lg:block" />
    </div>

    <div>
      <div v-if="pending">
        <loading-spinner />
      </div>
      <div v-else class="bg-white mt-5 md:p-5 mb-10">
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
