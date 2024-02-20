<script setup lang="ts">
import type { OrderType } from "@/types/order";
import type { RealtimeChannel } from "@supabase/supabase-js";
import OrdersDetails from "@/components/Orders/OrdersDetails.vue";

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();

let realtimeChannel: RealtimeChannel;

const route = useRoute();

const {
  data: order,
  pending,
  refresh: refreshOrders,
} = await useAsyncData<OrderType>("orders", () =>
  $fetch(`/api/orders/${route.params.id}`)
);

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
  <div>
    <div v-if="pending">
      <h1>Loading...</h1>
    </div>
    <div v-else>
      <orders-header :order="order" class="mb-4" />
      <UDivider />
      <orders-details :order="order" />
      <orders-edit :order="order" />
    </div>
  </div>
</template>
