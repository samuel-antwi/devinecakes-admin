<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isContentPage = computed(() => route.path.includes("/content"));
</script>

<template>
  <div v-if="isContentPage" class="dark:bg-[#21262E] p-3">
    <NuxtLink
      to="/admin/content/orders"
      class="flex items-center w-full mb-1.5 hover:bg-[#E4EAF1] dark:hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-150 ease-in-out"
      :class="
        route.path.includes('orders') ? 'dark:bg-[#30363D] bg-[#E4EAF1]' : ''
      "
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-heroicons-shopping-bag"
      />
      <h1 class="text-sm tracking-wide">Orders</h1>
    </NuxtLink>
    <NuxtLink
      :class="
        route.path.includes('customers') ? 'dark:bg-[#30363D] bg-[#E4EAF1]' : ''
      "
      to="/admin/content/customers"
      class="flex items-center w-full mb-1.5 hover:bg-[#E4EAF1] dark:hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-150 ease-in-out"
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-heroicons-user-group"
      />
      <h1 class="text-sm tracking-wide">Customers</h1>
    </NuxtLink>
  </div>
</template>
