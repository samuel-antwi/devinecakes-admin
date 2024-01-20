<script setup lang="ts">
const route = useRoute();

const showContentText = computed(() => {
  return route.path.includes("/admin/content");
});

const computedDetails = computed(() => {
  let title, icon;

  switch (route.name) {
    case "admin-content-orders":
      title = "Orders";
      icon = "i-heroicons-shopping-bag";
      break;
    case "admin-content-customers":
      title = "Customers";
      icon = "i-heroicons-users";
      break;
    case "admin-users":
      title = "User Directory";
      icon = "i-heroicons-users";
      break;
    case "admin-users-roles-id":
      title = "Administrator";
      icon = "i-heroicons-users";
      break;

    default:
      title = "Orders";
      icon = "i-heroicons-shopping-bag";
  }

  return { title, icon };
});
</script>
<template>
  <div class="flex items-center">
    <UButton
      class="w-10 lg:hidden h-10 flex mr-3 dark:bg-[#21262E] dark:text-gray-100 items-center justify-center rounded-full"
    >
      <UIcon class="text-xl" :name="'i-heroicons-bars-3'" />
    </UButton>
    <div class="hidden lg:block">
      <UButton
        class="w-10 h-10 flex mr-3 text-gray-700 bg-[#F0F4F9] dark:bg-[#21262E] dark:text-gray-100 items-center justify-center rounded-full"
      >
        <UIcon class="text-xl" :name="computedDetails.icon" />
      </UButton>
    </div>
    <span>
      <p v-if="showContentText" class="text-xs dark:text-gray-500">Content</p>
      <h1 class="text-2xl -mt-1 font-medium tracking-wide">
        {{ computedDetails.title }}
      </h1>
    </span>
  </div>
</template>
