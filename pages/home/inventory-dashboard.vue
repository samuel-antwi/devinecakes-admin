<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

definePageMeta({
  layout: "auth",
});

const router = useRouter();

const { data: orders } = await useAsyncData(`metrics-orders`, () =>
  $fetch(`/api/metrics/sales`)
);
function createNewOrder() {
  router.push("/admin/content/orders/create");
}
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
            <div class="mb-10 gap-5 md:grid grid-cols-5">
              <UCard class="col-span-3 mb-3 md:mb-0">
                <h1 class="font-semibold mb-3">Sales Metrics</h1>
                <p class="mb-3">
                  View all your metrics here and see the sales you have made
                  over certain period of time.
                </p>
                <UButton @click="createNewOrder" label=" Create New Order" />
              </UCard>
              <UCard class="col-span-2">
                <sales-order />
              </UCard>
            </div>
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
