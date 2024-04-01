<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

definePageMeta({
  layout: "auth",
});

const { data: orders } = await useAsyncData(`metrics-orders`, () =>
  $fetch(`/api/metrics/sales`)
);
</script>
<template>
  <div class="px-4">
    <navigation-side-drawer />
    <UDivider class="lg:hidden mt-5" />
    <metrics-sales-header />
    <div>
      <TabView>
        <TabPanel header="Dashboard">
          <div class="max-w-3xl">
            <metrics-sales-total-sales />
            <metrics-sales-weekly-sales :orders />
          </div>
        </TabPanel>
        <TabPanel header="Purchase Order">
          <div>
            <h1 class="mb-5 font-medium">Coming soon</h1>
            <p>You can keep track of all your purchase expenses here.</p>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>
