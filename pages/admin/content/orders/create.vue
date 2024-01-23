<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>
<template>
  <div>
    <app-actions
      :title="'Orders'"
      :icon="'i-heroicons-shopping-bag'"
      :can-go-back="true"
    >
      <template #actions>
        <app-buttons-save-button />
      </template>
    </app-actions>
    <div>
      <h1>Create Order</h1>
    </div>
  </div>
</template>
