<script setup lang="ts">
import { useCreateCustomer } from "@/components/App/composables/createCustomer";
const router = useRouter();

definePageMeta({
  layout: "auth",
});

const { formData } = useCreateCustomer();

async function createCustomer() {
  try {
    await $fetch("/api/customers/create", {
      method: "post",
      body: formData.value,
    });
    console.log(formData.value);
    await router.push("/admin/content/customers");
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
          @save-item="createCustomer"
          :can-save="enableSaveButton"
        />
      </template>
    </app-actions>
    <div>
      <customers-create-customer />
    </div>
  </div>
</template>
