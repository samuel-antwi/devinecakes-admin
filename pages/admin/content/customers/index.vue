<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const customers = ref(["ghgh"]);
const noCustomers = computed(() => customers.value.length === 0);
</script>
<template>
  <div>
    <div v-if="noCustomers" class="py-10">
      <app-global-empty-content
        description="You have no orders yet."
        :icon="'i-heroicons-user-group'"
        create-link="/admin/content/customers/create"
        button-label="Add Customer"
      />
    </div>
    <div v-else>
      <app-global-item-list></app-global-item-list>
    </div>
  </div>
</template>
