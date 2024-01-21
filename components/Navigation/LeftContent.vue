<script setup lang="ts">
import { routeConfig } from "@/utils/route-config";
import type { RouteConfigType } from "~/types/global";
const route = useRoute();

const showContentText = computed(() => {
  return route.path.includes("/admin/content");
});

const isCreatePage = computed(() => {
  return route.path.includes("/create");
});

const computedDetails = computed(() => {
  return (
    routeConfig[route.name as keyof RouteConfigType] || routeConfig["default"]
  );
});
</script>
<template>
  <div class="flex items-center">
    <navigation-side-drawer />
    <div class="hidden lg:block">
      <navigation-back-button v-if="isCreatePage" />
      <div
        v-else
        class="w-10 cursor-not-allowed h-10 flex mr-3 text-gray-700 bg-[#F0F4F9] dark:bg-[#21262E] dark:text-gray-100 items-center justify-center rounded-full"
      >
        <UIcon class="text-xl" :name="computedDetails.icon" />
      </div>
    </div>
    <span>
      <p v-if="showContentText" class="text-xs dark:text-gray-500">Content</p>
      <h1 class="text-2xl -mt-1 font-medium tracking-wide">
        {{ computedDetails.title }}
      </h1>
    </span>
  </div>
</template>
