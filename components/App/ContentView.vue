<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isContentPage = computed(() => route.path.includes("/content"));

const links = [
  {
    path: "/admin/content/orders",
    icon: "i-heroicons-shopping-bag",
    label: "Orders",
    activeLink: ["admin/content/orders/create", "admin/content/orders"],
  },
  {
    path: "/admin/content/customers",
    icon: "i-heroicons-user-group",
    label: "Customers",
    activeLink: ["admin/content/customers/create", "admin/content/customers"],
  },
];

const isActive = (path: string) =>
  route.path === path ? "dark:bg-[#30363D] bg-[#E4EAF1]" : "";
</script>

<template>
  <div v-if="isContentPage" class="dark:bg-[#21262E] p-3">
    <NuxtLink
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      :class="[isActive(link.path)]"
      class="flex items-center w-full mb-1.5 hover:bg-[#E4EAF1] dark:hover:bg-[#30363D] py-1.5 px-4 rounded transition-all duration-150 ease-in-out"
    >
      <UIcon class="text-2xl text-indigo-500 mr-2" :name="link.icon" />
      <h1 class="text-sm tracking-wide">{{ link.label }}</h1>
    </NuxtLink>
  </div>
</template>
