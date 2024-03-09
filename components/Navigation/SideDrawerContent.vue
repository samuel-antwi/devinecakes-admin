<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const supabase = useSupabaseClient();

const logout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};

const isContentTab = computed(() => {
  return route.path.includes("content") || route.path.includes("invoices");
});
const isUsersTab = computed(() => {
  return route.path.includes("users");
});
</script>
<template>
  <div class="z-30 fixed left-0 top-0 w-[250px] lg:w-[300px]">
    <app-logo />
    <div class="flex h-screen bg-[#EBEBEB] dark:bg-[#21262E]">
      <div class="flex flex-col items-center bg-[#0E1C2F]">
        <NuxtLink
          :class="[isContentTab ? 'dark:bg-[#21262E] bg-[#F0F4F9]' : '']"
          class="px-5 py-3 flex items-center justify-center"
          to="/admin/content/orders"
        >
          <UIcon
            :class="[
              isContentTab
                ? 'dark:text-gray-100 '
                : 'dark:text-gray-500 text-gray-300 hover:text-gray-100',
            ]"
            class="text-2xl"
            name="i-heroicons-archive-box"
          />
        </NuxtLink>
        <NuxtLink
          :class="[isUsersTab ? 'dark:bg-[#21262E] bg-[#F0F4F9]' : '']"
          class="px-5 py-3 flex items-center justify-center"
          to="/admin/users"
        >
          <UIcon
            :class="[
              isUsersTab
                ? 'dark:text-gray-100 '
                : 'dark:text-gray-500 text-gray-300 hover:text-gray-100',
            ]"
            class="text-2xl"
            name="i-heroicons-users"
          />
        </NuxtLink>
        <div class="absolute lg:bottom-28 bottom-52">
          <button
            @click="logout"
            class="dark:bg-[#30363D] text-gray-200 mt-4 p-[7px] rounded-full flex items-center justify-center"
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
