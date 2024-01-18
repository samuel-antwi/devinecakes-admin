<script setup lang="ts">
const props = defineProps<{
  description: string;
  icon: string;
}>();
</script>
<template>
  <div>
    <div>
      <UIcon :name="icon" />
    </div>
  </div>
</template>
