<script setup lang="ts">
const emit = defineEmits(["edit-item"]);

const emitDelete = (id: Number | String) => {
  emit("edit-item", id);
};
</script>

<template>
  <div>
    <UTooltip text="Edit" :popper="{ arrow: true }">
      <UButton
        icon="i-heroicons-pencil"
        color="gray"
        @click="emitDelete"
        class="w-12 h-12 flex items-center justify-center rounded-full"
      >
      </UButton>
    </UTooltip>
  </div>
</template>
