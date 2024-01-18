<script setup lang="ts">
const route = useRoute();
const isContentPage = computed(() => {
  return route.path.includes("/content");
});
</script>

<template>
  <div v-if="isContentPage" class="dark:bg-[#21262E] p-3">
    <NuxtLink
      to="/admin/content/orders"
      :class="[route.path === '/admin/content/orders' ? 'bg-[#30363D]' : '']"
      class="flex items-center w-full mb-1.5 hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-300 ease-in-out"
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-heroicons-shopping-bag"
      />
      <h1 class="text-sm tracking-wide">Orders</h1>
    </NuxtLink>
    <NuxtLink
      to="/admin/content/customers"
      :class="[route.path === '/content/customers' ? 'bg-[#30363D]' : '']"
      class="flex items-center hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-300 ease-in-out"
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-heroicons-user-group"
      />
      <h1 class="text-sm tracking-wide">Customers</h1>
    </NuxtLink>
  </div>
</template>
