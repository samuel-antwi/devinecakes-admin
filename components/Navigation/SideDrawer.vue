<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const supabase = useSupabaseClient();

const logout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};

const isContentTab = computed(() => {
  return (
    route.path === "/admin/content/orders" ||
    route.path === "/admin/content/customers"
  );
});
const isUsersTab = computed(() => {
  return route.path.includes("/users");
});
</script>
<template>
  <div>
    <app-logo />
    <div class="flex relative h-screen dark:bg-[#21262E]">
      <div class="flex flex-col items-center dark:bg-[#0D1217]">
        <NuxtLink
          :class="[isContentTab ? 'bg-[#21262E]' : '']"
          class="px-5 py-3 flex items-center justify-center"
          to="/admin/content/orders"
        >
          <UIcon
            :class="[
              isContentTab
                ? 'dark:text-gray-100 '
                : 'dark:text-gray-500 dark:hover:text-gray-100',
            ]"
            class="text-2xl"
            name="i-heroicons-archive-box"
          />
        </NuxtLink>
        <NuxtLink
          :class="[isUsersTab ? 'bg-[#21262E]' : '']"
          class="px-5 py-3 flex items-center justify-center"
          to="/admin/users"
        >
          <UIcon
            :class="[
              isUsersTab
                ? 'dark:text-gray-100 '
                : 'dark:text-gray-500 dark:hover:text-gray-100',
            ]"
            class="text-2xl dark:text-gray-500"
            name="i-heroicons-users"
          />
        </NuxtLink>
        <div class="absolute bottom-28">
          <theme-toggle />
          <button
            @click="logout"
            class="bg-[#30363D] mt-4 p-[7px] rounded-full flex items-center justify-center"
            type="button"
          >
            <UTooltip
              text="Log out"
              :popper="{ placement: 'right', arrow: true, offsetDistance: 16 }"
            >
              <UIcon
                class="text-xl"
                name="i-heroicons-arrow-left-start-on-rectangle"
              />
            </UTooltip>
          </button>
        </div>
      </div>
      <app-content-view />
      <app-user-view />
    </div>
  </div>
</template>
