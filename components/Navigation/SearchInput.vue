<script setup lang="ts">
const items = ref(2);
</script>

<template>
  <div class="flex items-center space-x-3">
    <p class="dark:text-gray-600">{{ items }} items</p>
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      color="white"
      :trailing="false"
      placeholder="Search items..."
    />
    <div>
      <NuxtLink to="/admin/content/orders/create">
        <UButton
          class="w-12 h-12 flex items-center justify-center rounded-full"
        >
          <UIcon class="text-xl" name="i-heroicons-plus" />
        </UButton>
      </NuxtLink>
    </div>
  </div>
</template>
