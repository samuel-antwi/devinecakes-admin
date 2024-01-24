<script setup lang="ts">
const route = useRoute();

const router = useRouter();

const computedDetails = computed(() => {
  let link;

  switch (route.name) {
    case "admin-content-orders":
      link = "/admin/content/orders/create";
      break;
    case "admin-content-customers":
      link = "/admin/content/customers/create";
      break;
    case "admin-users":
      link = "/admin/users/create";
      break;

    case "admin-users-id":
      link = "/admin/users/create";
      break;

    default:
      link = "/admin/content/orders/create";
  }

  return { link };
});
</script>

<template>
  <UTooltip text="Create Item" :popper="{ arrow: true }">
    <NuxtLink :to="`${computedDetails.link}`">
      <UButton
        icon="i-heroicons-plus"
        class="w-12 h-12 flex dark:bg-primary-600 dark:text-gray-100 items-center justify-center rounded-full"
      >
      </UButton>
    </NuxtLink>
  </UTooltip>
</template>
