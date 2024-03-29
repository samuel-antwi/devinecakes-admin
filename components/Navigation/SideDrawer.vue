<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
  <div>
    <UButton
      @click="isOpen = true"
      class="w-12 lg:hidden h-12 flex mr-3 dark:bg-[#21262E] dark:text-gray-100 items-center justify-center rounded-full"
    >
      <UIcon class="text-xl" :name="'i-mdi-menu'" />
    </UButton>
    <USlideover side="left" class="lg:hidden w-[250px]" v-model="isOpen">
      <div>
        <navigation-side-drawer-content />
      </div>
    </USlideover>
  </div>
</template>
