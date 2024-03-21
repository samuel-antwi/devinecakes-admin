<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { formatDate } from "@/utils/date-format";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { statusClass } from "@/libs/status-class";
import moment from "moment";

const route = useRoute();

definePageMeta({
  layout: "auth",
});

const items = [
  [
    {
      label: "Date Ordered",
      click: () => {
        getFilterByValue("date");
      },
    },
  ],
  [
    {
      label: "Due Date",
      click: () => {
        getFilterByValue("due-date");
      },
    },
  ],
  [
    {
      label: "Due Today",
      click: () => {
        getFilterByValue("due-today");
      },
    },
  ],
  [
    {
      label: "Due Tomorrow",
      click: () => {
        getFilterByValue("due-tomorrow");
      },
    },
  ],
];

const { filters } = useGlobalStore();
const selectedField = ref();
const selected = ref("");
const filterBy = ref(route?.query?.filter_by || "");
const query = ref(route?.query?.query || "");
const initialQuery = route?.query?.query || "";

const columns = [
  { field: "orderDate", header: "Order Date" },
  { field: "orderNumber", header: "Order #" },
  { field: "paymentReference", header: "Payment Ref" },
  { field: "deliveryDate", header: "Delivery Date" },
  { field: "orderStatus", header: "Order Status" },
  { field: "receivedAmount", header: "Recieved" },
  { field: "total", header: "Total" },
  { field: "balance", header: "Balance" },
];

const filtersBold = [
  "orderNumber",
  "paymentReference",
  "deliveryDate",
  "orderStatus",
  "amount",
  "paymentStatus",
];

const router = useRouter();
const onRowSelect = () => {
  const id = selectedField.value.id;
  router.push(`/admin/content/orders/${id}`);
};

const {
  data: orders,
  pending,
  refresh: refreshOrders,
} = await useAsyncData(
  `orders`,
  () =>
    $fetch(`/api/orders/orders`, {
      query: { filter_by: filterBy.value, query: query.value },
    }),
  {
    watch: [query],
  }
);

const noOrdrs = computed(() => orders?.value?.length === 0 && !query.value);

const client = useSupabaseClient();
let realtimeChannel: RealtimeChannel;
onMounted(() => {
  if (
    filterBy.value === "date" ||
    (filterBy.value === "due-date" && initialQuery)
  ) {
    query.value = moment(initialQuery, "YYYY-MM-DD").format("DD MMM YYYY");
  }
  realtimeChannel = client
    .channel("public:orders")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "orders" },
      () => refreshOrders()
    );

  realtimeChannel.subscribe();
});

onUnmounted(() => {
  client.removeChannel(realtimeChannel);
});

function getFilterByValue(value: string) {
  query.value = "";
  if (value === "date" || value === "due-date") {
    filterBy.value = value;
  } else if (value === "due-today") {
    filterBy.value = value;
    const today = moment().format("YYYY-MM-DD");
    query.value = today;
  } else if (value === "due-tomorrow") {
    filterBy.value = value;
    const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
    query.value = tomorrow;
  }
}
</script>
<template>
  <div>
    <app-actions
      class="px-4 lg:px-8"
      :title="'Orders'"
      :icon="'i-heroicons-shopping-bag'"
    >
      <template #actions>
        <search-input v-if="!noOrdrs" />
        <app-buttons-create-button />
      </template>
    </app-actions>
    <UDivider class="py-5" />
    <div v-if="pending">
      <loading-spinner />
    </div>
    <div v-else>
      <div v-if="noOrdrs">
        <app-global-empty-content
          description="You have no orders yet."
          :icon="'i-heroicons-shopping-bag'"
          create-link="/admin/content/orders/create"
          button-label="Create Order"
        />
      </div>
      <div v-else>
        <div class="px-4 md:px-8 mb-5">
          <global-filters
            :label="'Orders'"
            :url="'/admin/content/orders'"
            :items
            v-model:filter-by="filterBy"
            v-model:query="query"
            v-model:initial-query="initialQuery"
            v-model:selected="selected"
          />
        </div>
        <div class="bg-white md:p-5 mb-10">
          <DataTable
            ref="dt"
            v-model:filters="filters"
            sortMode="multiple"
            :value="orders"
            paginator
            :rows="7"
            dataKey="id"
            filterDisplay="menu"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            :globalFilterFields="filtersBold"
            v-model:selection="selectedField"
            selectionMode="single"
            @rowSelect="onRowSelect"
          >
            <template #empty> No item found. </template>
            <Column
              style="min-width: 9rem"
              v-for="col of columns"
              :key="col.field"
              :header="col.header"
            >
              <template #body="slotProps">
                <span
                  v-if="
                    col.field === 'orderDate' || col.field === 'deliveryDate'
                  "
                >
                  {{ formatDate(slotProps.data[col.field]) }}
                </span>
                <div v-else>
                  <span
                    v-show="
                      col.field === 'receivedAmount' ||
                      col.field === 'balance' ||
                      col.field === 'total'
                    "
                    >GHS</span
                  >
                  <span v-if="col.field === 'orderStatus'">
                    <UBadge
                      :ui="{ rounded: 'rounded-full' }"
                      :class="statusClass(slotProps.data[col.field])"
                    >
                      <span class="capitalize">
                        {{ slotProps.data[col.field] }}</span
                      >
                    </UBadge>
                  </span>
                  <span class="capitalize" v-else>{{
                    slotProps.data[col.field]
                  }}</span>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
