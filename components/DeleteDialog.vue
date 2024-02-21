<script setup lang="ts">
import { useDeleteAction } from "@/composables/deleteAction";

interface ParamsType {
  id: string;
  endpoint: string;
  successMessage: string;
  errorMessage: string;
}

const props = defineProps<{
  title?: string;
  message?: string;
  params: ParamsType;
  callBackUrl?: string;
}>();

const { handleDelete, isDeleteOpen } = useDeleteAction(props.params);
const router = useRouter();
async function handleSubmit() {
  await handleDelete();
  await router.push(props.callBackUrl || "/admin/content/orders");
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
          <h1 class="text-lg font-medium">{{ title }}</h1>
        </div>
        <p class="mt-2">
          {{ message }}
        </p>
        <div class="flex justify-end mt-4 space-x-2">
          <UButton color="white" label="Cancel" @click="isDeleteOpen = false" />
          <UButton color="primary" label="Delete" @click="handleSubmit" />
        </div>
      </div>
    </UModal>
  </ClientOnly>
</template>
