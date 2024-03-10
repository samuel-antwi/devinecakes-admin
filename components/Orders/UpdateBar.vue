<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(true);

// Function to reload the page and hide the component temporarily
const refresh = async () => {
  await updateCronJob();
  isVisible.value = false;
  setTimeout(() => {
    isVisible.value = true;
  }, 240000);
};

// Automatically show the component every 2 minutes
onMounted(() => {
  const interval = setInterval(() => {
    isVisible.value = true;
  }, 240000);

  // Cleanup the interval on component unmount
  onUnmounted(() => {
    clearInterval(interval);
  });
});

async function updateCronJob() {
  try {
    await $fetch("/api/orders/cron-job", {
      method: "PUT",
    });
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <div v-if="isVisible" class="bg-[#FCFFEC]">
    <div class="flex items-center justify-center px-4 py-2.5">
      <p class="mr-3 text-sm">
        Orders have an update. When you find time, refresh this tab to get the
        latest Orders status.
      </p>
      <UButton size="sm" label="Refresh" color="primary" @click="refresh" />
    </div>
  </div>
</template>
