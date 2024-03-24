<script setup lang="ts">
const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
<template>
  <div>
    <UTooltip text="Go back" :popper="{ arrow: true }">
      <UButton
        icon="i-mdi-arrow-left"
        @click="goBack"
        class="w-10 h-10 flex mr-3 text-gray-100 hover:text-gray-100 bg-primary dark:bg-[#21262E] dark:text-gray-100 items-center justify-center rounded-full"
      />
    </UTooltip>
  </div>
</template>
