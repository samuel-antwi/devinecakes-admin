<script setup lang="ts">
const { sideDrawerOpen } = useGlobalStore();
</script>

<template>
  <div>
    <UButton
      @click="sideDrawerOpen = true"
      class="w-12 lg:hidden h-12 flex mr-3 dark:bg-[#21262E] dark:text-gray-100 items-center justify-center rounded-full"
    >
      <UIcon class="text-xl" :name="'i-mdi-menu'" />
    </UButton>
    <USlideover
      side="left"
      class="lg:hidden w-[250px]"
      v-model="sideDrawerOpen"
    >
      <div>
        <navigation-side-drawer-content />
      </div>
    </USlideover>
  </div>
</template>
