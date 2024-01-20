<script setup lang="ts"></script>
<template>
  <div>
    <div class="lg:grid grid-cols-7">
      <div class="col-span-2">
        <navigation-side-drawer />
      </div>
      <div class="col-span-5 mt-10">
        <UContainer>
          <navigation-navbar />
          <UDivider class="mt-6" />
        </UContainer>
        <UContainer class="mt-6">
          <slot />
        </UContainer>
      </div>
    </div>
  </div>
</template>
