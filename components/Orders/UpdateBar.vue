<script setup lang="ts">
import { useStorage } from "@vueuse/core";
const isVisible = useStorage("update-bar-visible", false);

const refresh = async () => {
  await updateCronJob();
  isVisible.value = null;
};

// Function to calculate the milliseconds until the next midnight
const msUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0); // set to next midnight
  return midnight.getTime() - now.getTime();
};

// Function to setup visibility change
const setupVisibilityChange = () => {
  const firstTriggerInMs = msUntilMidnight();
  const oneDayInMs = 24 * 60 * 60 * 1000; // milliseconds in a day

  setTimeout(() => {
    isVisible.value = true;
    // After showing it once, set it to repeat daily
    setInterval(() => {
      isVisible.value = true;
    }, oneDayInMs);
  }, firstTriggerInMs);
};

onMounted(() => {
  setupVisibilityChange();
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
  <ClientOnly>
    <div v-if="isVisible" class="bg-[#FCFFEC]">
      <div class="flex items-center justify-center px-4 py-2.5">
        <p class="mr-3 text-sm">
          There have been an update on Orders data. Refresh this tab to get the
          latest update.
        </p>
        <UButton size="sm" label="Refresh" color="primary" @click="refresh" />
      </div>
    </div>
  </ClientOnly>
</template>
