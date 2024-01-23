<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
const { itemsCount } = useGlobalStore();
</script>
<template>
  <p v-if="itemsCount.length > 0" class="dark:text-gray-600 hidden lg:block">
    {{ itemsCount.length }} {{ itemsCount.length > 1 ? "items" : "item" }}
  </p>
</template>
