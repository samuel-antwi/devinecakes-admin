<script setup lang="ts">
const items = ref(2);
const q = ref("");
</script>

<template>
  <div class="flex items-center space-x-3">
    <p class="dark:text-gray-600">{{ items }} items</p>
    <UInput
      v-model="q"
      name="q"
      size="lg"
      placeholder="Search items..."
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="off"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #trailing>
        <UButton
          v-show="q !== ''"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="q = ''"
        />
      </template>
    </UInput>
    <navigation-create-button />
  </div>
</template>
