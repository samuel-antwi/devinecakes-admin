<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <ClientOnly>
    <button type="button" class="flex items-center justify-center w-6 h-6 ml-1">
      <UIcon
        :name="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        class="text-gray-200 dark:text-gray-200"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
    </button>
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>
