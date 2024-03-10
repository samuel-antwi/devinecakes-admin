<script setup lang="ts">
import { useCreateCustomer } from "@/components/App/composables/createCustomer";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const router = useRouter();

definePageMeta({
  layout: "auth",
});

const { formData } = useCreateCustomer();
const loading = ref(false);

async function createCustomer() {
  loading.value = true;
  try {
    const customer = await $fetch("/api/customers/create", {
      method: "POST",
      body: formData.value,
    });

    if (customer.id) {
      router.push(`/admin/content/customers/${customer.id}`);
    }
    loading.value = false;
    formData.value = {
      salutation: "",
      firstName: "",
      surname: "",
      mobileNumber: "",
      town: "",
      streetName: "",
      digitalAddress: "",
    };
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Customer created.",
      life: 4000,
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
      formData.value.mobileNumber &&
      !loading.value
  );
});
</script>
<template>
  <div>
    <app-actions
      class="px-4 lg:px-8"
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
    <div class="mb-5">
      <customers-create-customer />
    </div>
  </div>
</template>
