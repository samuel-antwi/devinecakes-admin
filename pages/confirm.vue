<script setup lang="ts">
const user = useSupabaseUser();
watch(
  user,
  () => {
    if (user?.value) {
      return navigateTo("/home/inventory-dashboard");
    }
  },
  { immediate: true }
);
</script>
<template>
  <loading-spinner />
</template>
