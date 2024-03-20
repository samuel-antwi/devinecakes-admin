<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
import { useDeleteAction } from "@/composables/deleteAction";

const { isOpen } = useGlobalStore();
const route = useRoute();

const id = route.params.id;
const params = {
  id: id.toString(),
  endpoint: "/api/customers/delete-customer",
  successMessage: "Customer deleted",
  errorMessage: "Error deleting customer",
};

const { isDeleteOpen } = useDeleteAction(params);

const items = [
  [
    {
      label: "Edit",
      icon: "i-mdi-pencil",
      click: () => {
        isOpen.value = true;
      },
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-mdi-trash-can-outline",
      click: () => {
        isDeleteOpen.value = true;
      },
    },
  ],
];
</script>

<template>
  <ClientOnly>
    <delete-dialog
      v-if="isDeleteOpen"
      :title="'Delete Customer'"
      :message="'Are you sure you want to delete this customer? This action cannot be undone.'"
      :params="params"
      :call-back-url="'/admin/content/customers'"
    />
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton
        color="white"
        label="More"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </ClientOnly>
</template>
