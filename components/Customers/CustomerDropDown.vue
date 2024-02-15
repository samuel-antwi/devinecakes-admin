<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
import { useDeleteAction } from "@/composables/deleteAction";

const { isOpen } = useGlobalStore();
const isDeleteOpen = ref(false);
const router = useRouter();
const route = useRoute();
const deletionConfirmed = ref(false);

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
        isDeleteOpen.value = true;
      },
    },
  ],
];

const id = route.params.id;

const params = {
  id: id.toString(),
  endpoint: "/api/customers/delete-customer",
  successMessage: "Customer deleted",
  errorMessage: "Error deleting customer",
};

const { handleDelete } = useDeleteAction(params);

async function handleSubmit() {
  await handleDelete();
  nextTick();
  await router.push("/admin/content/customers");
}
</script>

<template>
  <ClientOnly>
    <UModal v-model="isDeleteOpen">
      <div class="p-4">
        <div class="flex items-center">
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="text-red-500 text-2xl mr-2"
          />
          <h1 class="text-lg font-medium">Delete Customer</h1>
        </div>
        <p class="mt-2">
          Are you sure you want to delete this customer? This action cannot be
          undone.
        </p>
        <div class="flex justify-end mt-4 space-x-2">
          <UButton color="white" label="Cancel" @click="isDeleteOpen = false" />
          <UButton color="primary" label="Delete" @click="handleSubmit" />
        </div>
      </div>
    </UModal>
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton
        color="white"
        label="More"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </ClientOnly>
</template>
