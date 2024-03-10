<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { formatDate } from "@/utils/date-format";
import type { RealtimeChannel } from "@supabase/supabase-js";

definePageMeta({
  layout: "auth",
});

const { filters } = useGlobalStore();
const selectedField = ref();

const statusClass = (data: any) => {
  return [
    "px-2 py-1 capitalize text-sm font-medium shadow rounded-md",
    {
      "bg-yellow-50 text-yellow-700": data === "pending",
      "bg-green-50 text-green-700": data === "delivered",
      "bg-red-50 text-red-700": data === "cancelled",
      "bg-red-50 text-red-600": data === "overdue",
    },
  ];
};

const columns = [
  { field: "orderDate", header: "Order Date" },
  { field: "orderNumber", header: "Order #" },
  { field: "paymentReference", header: "Payment Ref" },
  { field: "deliveryDate", header: "Delivery Date" },
  { field: "orderStatus", header: "Order Status" },
  { field: "total", header: "Total" },
  { field: "receivedAmount", header: "Recieved" },
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
} = await useAsyncData(`orders`, () => $fetch(`/api/orders/orders`));

const noOrdrs = computed(() => orders?.value?.length === 0);

const client = useSupabaseClient();
let realtimeChannel: RealtimeChannel;
onMounted(() => {
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
      <div class="bg-white md:p-5 mb-10" v-else>
        <ClientOnly>
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
            <template #loading> Loading customers data. Please wait. </template>

            <Column
              style="min-width: 8rem"
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
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
