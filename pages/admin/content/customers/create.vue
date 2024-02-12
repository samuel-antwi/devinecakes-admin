<script setup lang="ts">
import { useCreateCustomer } from "@/components/App/composables/createCustomer";
import { useToast } from "primevue/usetoast";

const toast = useToast();

console.log("TOAST", toast);

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
      method: "post",
      body: formData.value,
    });

    if (customer.id) {
      // router.push(`/admin/content/customers`);
      router.push(`/admin/content/customers/${customer.id}`);
    }
    loading.value = false;
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Customer created",
      life: 10000,
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
