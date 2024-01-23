<script setup lang="ts">
const emit = defineEmits(["save-item"]);

const emitSave = (id: Number | String) => {
  emit("save-item", id);
};
</script>

<template>
  <div>
    <UTooltip text="Save" :popper="{ arrow: true }">
      <UButton
        icon="i-heroicons-check"
        @click="emitSave"
        class="w-12 h-12 flex items-center justify-center rounded-full"
      >
      </UButton>
    </UTooltip>
  </div>
</template>
