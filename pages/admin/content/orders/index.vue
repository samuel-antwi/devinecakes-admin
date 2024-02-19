<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { formatDate } from "@/utils/date-format";
definePageMeta({
  layout: "auth",
});

const { filters } = useGlobalStore();
const selectedField = ref();

const columns = [
  { field: "orderNumber", header: "Order #" },
  { field: "paymentReference", header: "Payment Ref" },
  { field: "orderDate", header: "Order Date" },
  { field: "deliveryDate", header: "Delivery Date" },
  { field: "orderStatus", header: "Status" },
  { field: "amount", header: "Amount" },
];

const filtersBold = [
  "orderNumber",
  "paymentReference",
  "deliveryDate",
  "orderStatus",
  "amount",
];

const router = useRouter();
const onRowSelect = () => {
  const id = selectedField.value.id;
  router.push(`/admin/content/orders/${id}`);
};

const {
  data: orders,
  pending,
  refresh,
} = await useAsyncData("orders", () => $fetch(`/api/orders/orders`));
const noOrdrs = computed(() => orders?.value?.length === 0);

const route = useRoute();
watch(
  route,
  (newVal, oldVal) => {
    if (newVal) {
      refresh();
    }
  },
  { immediate: true }
);

const statusClass = (data: any) => {
  return [
    "border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm",
    {
      "bg-yellow-200 text-gray-800": data === "pending",
      "bg-primary": data === "delivered",
    },
  ];
};
</script>
<template>
  <div>
    <app-actions :title="'Orders'" :icon="'i-heroicons-shopping-bag'">
      <template #actions>
        <search-input v-if="!noOrdrs" />
        <app-buttons-create-button />
      </template>
    </app-actions>
    <div v-if="!pending">
      <div v-if="noOrdrs">
        <app-global-empty-content
          description="You have no orders yet."
          :icon="'i-heroicons-shopping-bag'"
          create-link="/admin/content/orders/create"
          button-label="Create Order"
        />
      </div>
      <div class="my-10" v-else>
        <ClientOnly>
          <DataTable
            ref="dt"
            v-model:filters="filters"
            sortMode="multiple"
            :value="orders"
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
                  <span v-show="col.field === 'amount'">GHS</span>
                  <span v-if="col.field === 'orderStatus'">
                    <UBadge
                      :ui="{ rounded: 'rounded-full' }"
                      :class="statusClass(slotProps.data[col.field])"
                    >
                      {{ slotProps.data[col.field] }}
                    </UBadge>
                  </span>
                  <span v-else>{{ slotProps.data[col.field] }}</span>
                </div>
              </template>
            </Column>
          </DataTable>
        </ClientOnly>
      </div>
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>
