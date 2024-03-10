<script setup lang="ts">
import Toast from "primevue/toast";
</script>
<template>
  <div>
    <Toast position="top-center" />
    <div>
      <div class="hidden lg:block">
        <navigation-side-drawer-content />
      </div>
      <div>
        <div class="mt-6 lg:ml-[300px]">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
