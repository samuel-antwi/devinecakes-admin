<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import type { CustomerType } from "@/types/customers";

defineProps<{
  customer: CustomerType;
}>();
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
        <div class="mt-10">
          <customers-transactions-sales-orders :customer="customer" />
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>
