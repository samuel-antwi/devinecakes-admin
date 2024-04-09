<script setup lang="ts">
const user = useSupabaseUser();
watch(
  user,
  () => {
    if (user?.value) {
      return navigateTo("/admin/content/orders");
    } else {
      return navigateTo("/login");
    }
  },
  { immediate: true }
);
</script>
<template>
  <loading-spinner />
</template>
