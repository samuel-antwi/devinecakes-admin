<script setup lang="ts"></script>
<template>
  <div>
    <div class="lg:grid grid-cols-10">
      <div class="col-span-2 hidden lg:block">
        <navigation-side-drawer-content />
      </div>
      <div class="col-span-8">
        <UContainer class="mt-6">
          <slot />
        </UContainer>
      </div>
    </div>
  </div>
</template>
