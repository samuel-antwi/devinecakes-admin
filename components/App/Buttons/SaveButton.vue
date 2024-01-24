<script setup lang="ts">
const emit = defineEmits(["save-item"]);

const emitSave = () => {
  emit("save-item");
};
</script>

<template>
  <div>
    <UTooltip text="Save" :popper="{ arrow: true }">
      <UButton
        type="submit"
        icon="i-heroicons-check"
        @click.prevent="emitSave"
        class="w-12 h-12 dark:bg-primary-600 dark:text-gray-100 flex items-center justify-center rounded-full"
      >
      </UButton>
    </UTooltip>
  </div>
</template>
