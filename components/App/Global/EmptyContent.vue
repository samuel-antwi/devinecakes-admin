<script setup lang="ts">
const props = defineProps<{
  description: string;
  icon: string;
  createLink: string;
  buttonLabel: string;
  title: string;
}>();
</script>
<template>
  <div class="flex flex-col mt-32 justify-center items-center h-auto">
    <div class="flex flex-col items-center space-y-4">
      <div
        class="w-24 h-24 flex items-center justify-center bg-[#F0F4F9] dark:bg-[#21262E] rounded-full"
      >
        <UIcon class="text-4xl text-gray-500" :name="icon" />
      </div>
      <h1 class="font-semibold text-3xl tracking-wide">{{ title }}</h1>
      <p class="dark:text-gray-500 text-center w-[500px] text-lg">
        {{ description }}
      </p>
      <NuxtLink :to="`${createLink}`">
        <UButton
          size="xl"
          class="mt-4 dark:text-gray-100 text-lg dark:bg-primary-600"
          >{{ buttonLabel }}</UButton
        >
      </NuxtLink>
    </div>
  </div>
</template>
