<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const canShow = computed(
  () =>
    route.path.includes("/content") ||
    route.path.includes("/invoices") ||
    route.path === "/admin" ||
    route.path.includes("/home/")
);
</script>

<template>
  <div v-if="canShow" class="dark:bg-[#21262E] p-3">
    <NuxtLink
      to="/admin/content/orders"
      class="flex items-center w-full mb-1.5 hover:bg-gray-50 dark:hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-150 ease-in-out"
      :class="
        route.path.includes('orders') ? 'dark:bg-[#30363D] bg-gray-50' : ''
      "
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-mdi-shopping-outline"
      />
      <h1 class="text-sm tracking-wide">Orders</h1>
    </NuxtLink>
    <NuxtLink
      to="/admin/content/customers"
      class="flex items-center w-full mb-1.5 hover:bg-gray-50 dark:hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-150 ease-in-out"
      :class="
        route.path.includes('customers') ? 'dark:bg-[#30363D] bg-gray-50' : ''
      "
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-mdi-users-group-outline"
      />
      <h1 class="text-sm tracking-wide">Customers</h1>
    </NuxtLink>
    <NuxtLink
      to="/admin/invoices"
      class="flex items-center w-full mb-1.5 hover:bg-gray-50 dark:hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-150 ease-in-out"
      :class="
        route.path.includes('invoices') ? 'dark:bg-[#30363D] bg-gray-50' : ''
      "
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-mdi-invoice-text-outline"
      />
      <h1 class="text-sm tracking-wide">Invoice</h1>
    </NuxtLink>
  </div>
</template>
