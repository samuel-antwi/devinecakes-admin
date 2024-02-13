<script setup lang="ts">
import type { CustomerType } from "@/types/customers";
import { useGlobalStore } from "@/composables/globalStore";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const props = defineProps<{
  customer: CustomerType;
}>();

const { isOpen } = useGlobalStore();

// make deep copy of customer object
const formData = ref<CustomerType>(JSON.parse(JSON.stringify(props.customer)));

const { data, error, execute } = useFetch<CustomerType>(
  `/api/customers/update`,
  {
    method: "put",
    body: formData.value,
  }
);

async function handleSubmit() {
  await execute();
  if (!error.value) {
    isOpen.value = false;
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Customer details updated",
    });
  }
}
</script>

<template>
  <div class="w-[500px]">
    <UModal v-model="isOpen" prevent-close>
      <UCard>
        <template #header>
          <h1 class="text-lg font-medium">Edit Customer details</h1>
          <UButton
            @click="isOpen = false"
            icon="i-heroicons-x-mark"
            class="absolute right-4 top-4"
            color="white"
          />
        </template>
        <div class="flex items-center space-x-3">
          <div class="w-20">
            <label class="text-sm mb-2 block" for="salutation"
              >Salutation</label
            >
            <UInputMenu
              id="salutation"
              size="md"
              :options="['Mr', 'Mrs', 'Miss', 'Dr', 'Prof', 'Rev', 'Other']"
              v-model="formData.salutation"
            />
          </div>
          <div class="md:mb-0">
            <label class="text-sm mb-2 block" for="first name"
              >First Name</label
            >
            <UInput v-model="formData.firstName" id="first name" size="md" />
          </div>
          <div>
            <label class="text-sm mb-2 block" for="surname">Surname</label>
            <UInput v-model="formData.surname" id="surname" size="md" />
          </div>
        </div>
        <div class="mt-5 flex items-center space-x-4">
          <div>
            <label class="text-sm mb-2 block" for="mobile">Mobile number</label>
            <UInput v-model="formData.mobileNumber" id="mobile" size="md" />
          </div>
          <div>
            <label class="text-sm mb-2 block" for="town">Town</label>
            <UInput v-model="formData.town" id="mobile" size="md" />
          </div>
        </div>
        <div class="mt-5 flex items-center space-x-4">
          <div>
            <label class="text-sm mb-2 block" for="street">Street name</label>
            <UInput v-model="formData.streetName" id="street" size="md" />
          </div>
          <div>
            <label class="text-sm mb-2 block" for="digital address"
              >Digital address</label
            >
            <UInput
              v-model="formData.digitalAddress"
              id="digital address"
              size="md"
            />
          </div>
        </div>
        <template #footer>
          <div class="flex items-center space-x-2">
            <UButton @click="handleSubmit" type="button" label="Save" />
            <UButton @click="isOpen = false" color="white" label="Cancel" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
