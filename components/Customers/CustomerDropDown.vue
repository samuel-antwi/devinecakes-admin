<script setup lang="ts">
import { useGlobalStore } from "@/composables/globalStore";
import { useToast } from "primevue/usetoast";
const { isOpen } = useGlobalStore();
const toast = useToast();
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
        handleDelete();
      },
    },
  ],
];

const router = useRouter();
const route = useRoute();

const id = route.params.id;
const { error, execute } = useFetch("/api/customers/delete-customer", {
  method: "DELETE",
  body: {
    id: id,
  },
  immediate: false,
  watch: false,
});

async function handleDelete() {
  await execute();
  if (!error.value) {
    router.push("/admin/content/customers");
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Customer deleted",
      life: 3000,
    });
  }
}
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
