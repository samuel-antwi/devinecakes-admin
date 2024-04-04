<script setup lang="ts">
const { sideDrawerOpen } = useGlobalStore();

const closeSideDrawer = () => {
  if (sideDrawerOpen) {
    sideDrawerOpen.value = false;
  }
};
</script>
<template>
  <div class="w-full bg-[#0E1C2F] dark:bg-[#30363D]">
    <div class="flex items-center">
      <div @click="closeSideDrawer" class="bg-[#0E1C2F] p-[17px]">
        <NuxtLink to="/admin/content/orders">
          <UIcon class="text-3xl text-gray-100" name="i-heroicons-cake" />
        </NuxtLink>
      </div>
      <div class="ml-4">
        <p class="text-gray-50">Devinecakesgh</p>
      </div>
    </div>
  </div>
</template>
