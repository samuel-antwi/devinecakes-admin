<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/admin/content/orders" });
</script>

<template>
  <main
    class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <h2 class="text-2xl font-semibold text-primary">
        {{ error.statusCode }}
      </h2>
      <div v-if="error?.statusCode === 404">
        <h1
          class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          Page not found
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </div>
      <div v-else>
        <h1>An error occurred!</h1>
      </div>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <button
          @click="handleError"
          class="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  </main>
</template>
