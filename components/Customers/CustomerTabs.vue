<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import type { CustomerType } from "@/types/customers";

const props = defineProps<{
  customer: CustomerType;
}>();
</script>
<template>
  <div>
    <TabView>
      <TabPanel header="Overview">
        <customers-details :customer="customer" />
        <customers-address :customer="customer" class="mt-3" />
      </TabPanel>
      <TabPanel header="Transactions">
        <p class="m-0">Customer transactions</p>
      </TabPanel>
    </TabView>
  </div>
</template>
