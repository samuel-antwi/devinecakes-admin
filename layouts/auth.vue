<script setup lang="ts">
import Toast from "primevue/toast";
</script>
<template>
  <div>
    <Toast position="bottom-right" />
    <div>
      <div class="hidden lg:block">
        <navigation-side-drawer-content />
      </div>
      <div>
        <div class="mt-6 lg:ml-[300px] px-4 lg:px-8">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
