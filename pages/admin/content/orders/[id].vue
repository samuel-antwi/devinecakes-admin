<script setup lang="ts">
import type { OrderType } from "@/types/order";
import type { RealtimeChannel } from "@supabase/supabase-js";
import OrdersDetails from "@/components/Orders/OrdersDetails.vue";

definePageMeta({
  layout: "auth",
});

const route = useRoute();

const { data: order, refresh: refreshOrders } = await useAsyncData<OrderType>(
  "orders-details",
  () => $fetch(`/api/orders/${route?.params?.id as string}`)
);

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
  <div class="mb-10">
    <orders-header :order class="mb-10 px-4 lg:px-8" />
    <UDivider />
    <div class="bg-white py-5">
      <orders-details :order />
      <orders-edit :order />
    </div>
  </div>
</template>
