<script setup lang="ts">
const route = useRoute();
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
  <div>
    <NuxtLink :to="`${computedDetails.link}`">
      <UButton class="w-12 h-12 flex items-center justify-center rounded-full">
        <UIcon class="text-xl" name="i-heroicons-plus" />
      </UButton>
    </NuxtLink>
  </div>
</template>
