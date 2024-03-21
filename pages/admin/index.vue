<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
const route = useRoute();
console.log(route);
const user = useSupabaseUser();
</script>
<template>
  <div class="px-4">
    <navigation-side-drawer />
    <div>
      <h1>Hello world</h1>
    </div>
  </div>
</template>
