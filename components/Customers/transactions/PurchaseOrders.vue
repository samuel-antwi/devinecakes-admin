<script setup lang="ts">
import type { CustomerType } from "@/types/customers";
import type { OrderType } from "@/types/order";
import { useGlobalStore } from "@/composables/globalStore";
import Accordion from "primevue/accordion";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { formatDate } from "@/utils/date-format";
const props = defineProps<{
  customer: CustomerType;
}>();

const columns = [
  { field: "orderNumber", header: "Order #" },
  { field: "paymentReference", header: "Payment Ref" },
  { field: "orderDate", header: "Order Date" },
  { field: "deliveryDate", header: "Delivery Date" },
  { field: "orderStatus", header: "Status" },
  { field: "amount", header: "Amount" },
];

const customerOrders = ref<OrderType[]>([]);
const canPaginate = computed(() => customerOrders.value.length > 10);

const { filters } = useGlobalStore();
const selectedField = ref();

const router = useRouter();
const onRowSelect = () => {
  const id = selectedField.value.id;
  router.push(`/admin/content/orders/${id}`);
};

onMounted(() => {
  customerOrders.value = props.customer.orders ?? [];
});
</script>
<template>
  <div>
    <Accordion :activeIndex="0">
      <AccordionTab header="Purchase Orders">
        <div v-if="!customerOrders.length">
          <h1>No Purchase orders found</h1>
        </div>
        <div v-else>
          <DataTable
            ref="dt"
            v-model:filters="filters"
            :value="customerOrders"
            :paginator="canPaginate"
            :rows="10"
            dataKey="id"
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
                  <span>{{ slotProps.data[col.field] }}</span>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>
