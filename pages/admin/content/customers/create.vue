<script setup lang="ts">
import { useCreateCustomer } from "@/components/App/composables/createCustomer";

definePageMeta({
  layout: "auth",
});

const { formData } = useCreateCustomer();

const saveCustomer = async () => {
  await createCustomer();
};

async function createCustomer() {
  try {
    await useFetch("/api/customers/create", {
      method: "post",
      body: formData.value,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
}

const enableSaveButton = computed(() => {
  return Boolean(
    formData.value.firstName &&
      formData.value.surname &&
      formData.value.mobileNumber
  );
});
</script>
<template>
  <div>
    <app-actions
      :title="'Adding new Customer'"
      :icon="'i-heroicons-user-group'"
      :can-go-back="true"
    >
      <template #actions>
        <app-buttons-save-button
          @save-item="saveCustomer"
          :can-save="enableSaveButton"
        />
      </template>
    </app-actions>
    <div>
      <customers-create-customer />
    </div>
  </div>
</template>
