<script setup lang="ts">
const emit = defineEmits(["delete-item"]);

const emitDelete = (id: Number | String) => {
  emit("delete-item", id);
};
</script>

<template>
  <div>
    <UTooltip text="Delete" :popper="{ arrow: true }">
      <UButton
        icon="i-heroicons-trash"
        color="gray"
        @click="emitDelete"
        class="w-12 h-12 flex items-center justify-center rounded-full"
      >
      </UButton>
    </UTooltip>
  </div>
</template>
