<script setup lang="ts">
import { useCreateCustomer } from "@/components/App/composables/createCustomer";

definePageMeta({
  layout: "auth",
});

const { formData } = useCreateCustomer();

const save = () => {
  console.log(formData.value);
};
</script>
<template>
  <div>
    <app-actions
      :title="'Adding new Customer'"
      :icon="'i-heroicons-user-group'"
      :can-go-back="true"
    >
      <template #actions>
        <app-buttons-save-button @save-item="save" />
      </template>
    </app-actions>
    <div>
      <customers-create-customer />
    </div>
  </div>
</template>
