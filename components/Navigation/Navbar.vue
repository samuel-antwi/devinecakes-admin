<script setup lang="ts"></script>
<template>
  <div class="flex items-center justify-between">
    <navigation-left-content />
    <div class="flex items-center space-x-3">
      <navigation-search-input />
      <navigation-create-button />
      <app-buttons-delete-button />
      <app-buttons-edit-button />
      <app-buttons-save-button />
    </div>
  </div>
</template>
