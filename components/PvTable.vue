<script setup lang="ts">
import { ref, onMounted } from "vue";
import { customerService } from "@/data/customer-service";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import { useGlobalStore } from "@/composables/globalStore";
import type { CustomerType } from "@/types/customers";
import type { OrderType } from "@/types/order";

const props = defineProps<{
  columns: any[];
  filters: any[];
  value: CustomerType[] | OrderType[];
}>();

const { filters } = useGlobalStore();

const customers = ref();

const loading = ref(true);

onMounted(() => {
  customerService.getCustomersMedium().then((data) => {
    customers.value = getCustomers(data);
    loading.value = false;
  });
});

const formatDate = (value) => {
  return value.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
const formatCurrency = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const getCustomers = (data) => {
  return [...(data || [])].map((d) => {
    d.date = new Date(d.date);
    return d;
  });
};
</script>

<template>
  <ClientOnly>
    <DataTable
      v-model:filters="filters"
      sortMode="multiple"
      :value="value"
      paginator
      :rows="10"
      dataKey="id"
      :loading="loading"
      filterDisplay="menu"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :globalFilterFields="props.filters"
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
</template>
