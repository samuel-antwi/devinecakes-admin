<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <div class="mb-6 mt-5 lg:mt-0">
    <div class="flex items-center">
      <div class="w-10 h-10 border rounded-md flex items-center justify-center">
        <UIcon class="text-2xl text-gray-600" name="i-mdi-home-city-outline" />
      </div>
      <div class="text-sm ml-2">
        <h1>
          Hello, <span>{{ user?.email }}</span>
        </h1>
        <h2 class="text-gray-600">Devinecakesgh</h2>
      </div>
    </div>
  </div>
</template>
