<script setup lang="ts">
import type { CustomerType } from "@/types/customers";
import type { RealtimeChannel } from "@supabase/supabase-js";

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();

let realtimeChannel: RealtimeChannel;

const route = useRoute();

const id = ref(route.params.id) as Ref<string>;

const {
  data: customer,
  pending,
  refresh: refreshCustomers,
} = await useAsyncData("customer", () =>
  $fetch<CustomerType>(`/api/customers/${id.value}`)
);

onMounted(() => {
  realtimeChannel = client
    .channel("public:customers")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "customers" },
      () => refreshCustomers()
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
      <loading-spinner />
    </div>
    <div v-else>
      <customers-header :customer="customer" class="mb-10" />
      <UCard>
        <customers-customer-tabs :customer="customer" />
      </UCard>
    </div>
  </div>
</template>
