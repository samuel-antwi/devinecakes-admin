<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
const { isOpen } = useGlobalStore();
const items = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        isOpen.value = true;
      },
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      disabled: true,
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        console.log("User deleted");
      },
    },
  ],
];
</script>

<template>
  <ClientOnly>
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton
        color="white"
        label="More"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </ClientOnly>
</template>
