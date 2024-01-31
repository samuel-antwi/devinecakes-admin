<script setup lang="ts">
const router = useRouter();
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/admin/content/orders");
    } else {
      return navigateTo("/login");
    }
  },
  { immediate: true }
);
</script>
<template>
  <div>Content.</div>
</template>
