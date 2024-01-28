<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>
<template>
  <div>
    <app-actions
      :title="'Creating an Order'"
      :icon="'i-heroicons-shopping-bag'"
      :can-go-back="true"
    >
      <template #actions>
        <app-buttons-save-button />
      </template>
    </app-actions>
    <div class="mb-10">
      <orders-create-order />
    </div>
  </div>
</template>
