<script setup lang="ts">
import { useCreateCustomer } from "@/components/App/composables/createCustomer";

const { formData } = useCreateCustomer();
</script>
<template>
  <div class="max-w-2xl">
    <form class="flex flex-col space-y-10">
      <div>
        <label class="text-xl font-medium mb-2 block" for="first name"
          >First Name *</label
        >
        <UInput
          v-model="formData.firstName"
          :ui="{ spacing: 'py-4' }"
          id="first name"
          size="xl"
        />
      </div>
      <div>
        <label class="text-xl font-medium mb-2 block" for="surname"
          >Surname</label
        >
        <UInput
          v-model="formData.surname"
          :ui="{ spacing: 'py-4' }"
          id="surname"
          size="xl"
        />
      </div>
      <div>
        <label class="text-xl font-medium mb-2 block" for="mobile"
          >Mobile Number *</label
        >
        <UInput
          v-model="formData.mobileNumber"
          :ui="{ spacing: 'py-4' }"
          id="mobile"
          size="xl"
        />
      </div>
      <div>
        <label class="text-xl font-medium mb-2 block" for="location"
          >Location</label
        >
        <UInput
          v-model="formData.location"
          :ui="{ spacing: 'py-4' }"
          id="location"
          size="xl"
        />
      </div>
    </form>
  </div>
</template>
