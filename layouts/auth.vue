<script setup lang="ts"></script>
<template>
  <div>
    <div class="grid grid-cols-7 gap-10">
      <div class="col-span-2">
        <navigation-side-drawer />
      </div>
      <div class="col-span-5">
        <slot />
      </div>
    </div>
  </div>
</template>
