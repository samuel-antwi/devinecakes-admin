<script setup lang="ts">
const route = useRoute();
const isUsersPage = computed(() => {
  return route.path.includes("/users");
});
</script>

<template>
  <div v-if="isUsersPage" class="dark:bg-[#21262E] p-3">
    <NuxtLink
      to="/admin/users"
      :class="[
        route.path === '/admin/users' ? 'dark:bg-[#30363D] bg-[#E4EAF1]' : '',
      ]"
      class="flex items-center w-full mb-1.5 hover:bg-[#E4EAF1] dark:hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-300 ease-in-out"
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-heroicons-user-circle"
      />
      <h1 class="text-sm tracking-wide">All Users</h1>
    </NuxtLink>
    <NuxtLink
      :to="`/admin/users/roles/${1}`"
      :class="[
        route.path.includes('/roles') ? 'dark:bg-[#30363D] bg-[#E4EAF1]' : '',
      ]"
      class="flex items-center dark:hover:bg-[#30363D] hover:bg-[#E4EAF1] py-1.5 px-4 rounded transition-all duration-300 ease-in-out"
    >
      <UIcon
        class="text-2xl text-indigo-500 mr-2"
        name="i-heroicons-cog-8-tooth"
      />
      <h1 class="text-sm tracking-wide">Administrator</h1>
    </NuxtLink>
  </div>
</template>
