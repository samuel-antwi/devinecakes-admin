<script setup lang="ts">
const route = useRoute();
const isUsersPage = computed(() => {
  return route.path === "/admin/users";
});
</script>

<template>
  <div v-if="isUsersPage" class="dark:bg-[#21262E] p-3">
    <NuxtLink
      to="/content/orders"
      :class="[isUsersPage ? 'bg-[#30363D]' : '']"
      class="flex items-center w-full mb-1.5 hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-300 ease-in-out"
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-heroicons-user-circle"
      />
      <h1 class="text-sm tracking-wide">All Users</h1>
    </NuxtLink>
    <NuxtLink
      to="/users"
      :class="[isUsersPage ? '' : '']"
      class="flex items-center hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-300 ease-in-out"
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-heroicons-cog-8-tooth"
      />
      <h1 class="text-sm tracking-wide">Administrator</h1>
    </NuxtLink>
  </div>
</template>
