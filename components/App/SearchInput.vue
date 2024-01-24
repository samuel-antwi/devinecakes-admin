<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
const { searchQuery } = useGlobalStore();
</script>

<template>
  <div class="flex items-center space-x-3">
    <navigation-item-count />
    <UInput
      v-model="searchQuery"
      name="searchQuery "
      size="xl"
      placeholder="Search items..."
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="off"
      :ui="{
        rounded: 'rounded-full',
        icon: { trailing: { pointer: '' } },
      }"
    >
      <template #trailing>
        <UButton
          v-show="searchQuery !== ''"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="searchQuery = ''"
        />
      </template>
    </UInput>
  </div>
</template>
