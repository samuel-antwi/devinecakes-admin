<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
</script>
<template>
  <div>
    <TabView>
      <TabPanel header="Overview">
        <p class="m-0">Customer details</p>
      </TabPanel>
      <TabPanel header="Transactions">
        <p class="m-0">Customer transactions</p>
      </TabPanel>
    </TabView>
  </div>
</template>
