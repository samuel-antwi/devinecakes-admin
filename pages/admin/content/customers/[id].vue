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
  pending,
  data: customer,
  refresh: refreshCustomers,
} = await useFetch<CustomerType>(`/api/customers/${id.value}`);

// Once page is mounted, listen to changes on the `collaborators` table and refresh collaborators when receiving event
onMounted(() => {
  // Real time listener for new workouts
  realtimeChannel = client
    .channel("public:customers")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "customers" },
      () => refreshCustomers()
    );

  realtimeChannel.subscribe();
});

// Don't forget to unsubscribe when user left the page
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
      <customers-header :customer="customer" class="mb-4" />
      <customers-customer-tabs :customer="customer" />
    </div>
  </div>
</template>
