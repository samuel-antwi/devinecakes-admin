<script setup lang="ts">
const props = defineProps<{
  title: string;
  icon: string;
  canGoBack?: boolean;
}>();

const route = useRoute();

const showContentText = computed(() => {
  return route.path.includes("/admin/content");
});
</script>
<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <navigation-side-drawer />
        <div class="hidden lg:block">
          <back-button v-if="canGoBack" />
          <div
            v-else
            class="w-10 hidden cursor-not-allowed h-10 md:flex mr-3 text-gray-100 bg-primary dark:bg-[#21262E] dark:text-gray-100 items-center justify-center rounded-full"
          >
            <UIcon class="text-xl" :name="icon" />
          </div>
        </div>
        <span class="hidden lg:block">
          <p v-if="showContentText" class="text-xs dark:text-gray-500">
            Content
          </p>
          <h1 class="md:text-2xl -mt-1 font-medium tracking-wide">
            {{ title }}
          </h1>
        </span>
      </div>
      <div class="flex items-center space-x-3">
        <slot name="search" />
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
