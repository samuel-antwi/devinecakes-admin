<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
const { filters } = useGlobalStore();
const props = defineProps({
  size: {
    type: String,
    default: "lg",
  },
});
</script>

<template>
  <div class="flex items-center space-x-3">
    <navigation-item-count />
    <UInput
      v-model="filters['global'].value"
      :name="filters['global'].value"
      :size="size"
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
          v-show="filters['global'].value"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="filters['global'].value = ''"
        />
      </template>
    </UInput>
  </div>
</template>
