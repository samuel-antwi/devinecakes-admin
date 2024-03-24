<script setup lang="ts">
const emit = defineEmits(["save-item"]);

const emitSave = () => {
  emit("save-item");
};

const props = withDefaults(
  defineProps<{
    canSave?: boolean;
  }>(),
  {
    canSave: false,
  }
);
</script>

<template>
  <div>
    <UTooltip
      :text="!props.canSave ? 'Can\'t save' : 'Save'"
      :popper="{ arrow: true }"
    >
      <UButton
        :ui="{ color: 'dark:disabled:bg-gray-300' }"
        :disabled="!props.canSave"
        type="submit"
        icon="i-mdi-check"
        @click.prevent="emitSave"
        class="w-12 h-12 dark:bg-primary-600 dark:text-gray-100 flex items-center justify-center rounded-full"
      >
      </UButton>
    </UTooltip>
  </div>
</template>
