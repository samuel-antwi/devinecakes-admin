<script setup lang="ts">
import type { OrderType } from "@/types/order";
import type { RealtimeChannel } from "@supabase/supabase-js";

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();

let realtimeChannel: RealtimeChannel;

const route = useRoute();

const id = ref(route.params.id) as Ref<string>;

const {
  data: order,
  pending,
  refresh: refreshOrders,
} = await useAsyncData<OrderType>("orders", () =>
  $fetch(`/api/orders/${id.value}`)
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
      <!-- <orders-customer-tabs :customer="customer" /> -->
    </div>
  </div>
</template>
