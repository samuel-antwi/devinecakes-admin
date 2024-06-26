<script setup lang="ts">
import type { CustomerType } from "@/types/customers";
import { useGlobalStore } from "@/composables/globalStore";
import { useToast } from "primevue/usetoast";
import { isEqual, cloneDeep } from "lodash-es";

const toast = useToast();

const props = defineProps<{
  customer: CustomerType;
}>();

const { isOpen } = useGlobalStore();

// make deep copy of customer object
const formData = ref<CustomerType>(cloneDeep(props.customer));

const canSaveChanges = computed(() => {
  return !isEqual(props.customer, formData.value);
});

const closeModal = () => {
  if (canSaveChanges.value) {
    if (confirm("You have unsaved changes. Are you sure you want to close?")) {
      isOpen.value = false;
    }
  } else {
    isOpen.value = false;
  }
};

const loading = ref(false);
async function handleSubmit() {
  loading.value = true;
  try {
    const customer = await $fetch("/api/customers/update", {
      method: "PUT",
      body: formData.value,
    });
    loading.value = false;
    isOpen.value = false;
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Customer updated.",
      life: 4000,
    });
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "An error occurred. Please try again.",
      life: 4000,
    });
    throw new Error(e.message);
  }
}
</script>

<template>
  <div>
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
            <UButton
              :disabled="!canSaveChanges"
              @click="handleSubmit"
              type="button"
              label="Save"
            />
            <UButton @click="closeModal" color="white" label="Cancel" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
