<script setup lang="ts">
const user = useSupabaseUser();
watch(
  user,
  () => {
    if (user?.value) {
      return navigateTo("/admin/content/orders");
    }
  },
  { immediate: true }
);
</script>
<template>
  <loading-spinner />
</template>
