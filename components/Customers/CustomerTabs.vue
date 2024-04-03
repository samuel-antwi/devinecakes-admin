<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import type { CustomerType } from "@/types/customers";

const props = defineProps<{
  customer: CustomerType;
}>();
console.log(props.customer);

const hasOrders = computed(() => {
  return props?.customer?.orders?.length > 5;
});
</script>
<template>
  <div>
    <TabView>
      <TabPanel header="Overview">
        <div class="mt-10">
          <customers-details :customer="customer" />
          <customers-address :customer="customer" class="mt-3" />
        </div>
      </TabPanel>
      <TabPanel header="Transactions">
        <div v-if="hasOrders" class="flex justify-start mb-5">
          <search-input />
        </div>
        <div class="mt-5">
          <customers-transactions-sales-orders :customer="customer" />
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>
