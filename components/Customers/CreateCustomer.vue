<script setup lang="ts">
import { useCreateCustomer } from "@/components/App/composables/createCustomer";

const { formData } = useCreateCustomer();
const options = ["Mr", "Mrs", "Miss", "Dr", "Prof", "Rev", "Other"];
</script>
<template>
  <ClientOnly>
    <UCard>
      <div class="max-w-3xl md:py-8 py-5 mx-auto">
        <h1 class="font-medium mb-6">Customer details</h1>
        <form class="flex flex-col space-y-10">
          <div class="md:grid grid-cols-5 gap-5">
            <div class="col-span-1 mb-10 md:mb-0">
              <label class="text-lg font-medium mb-2 block" for="salutation"
                >Salutation</label
              >
              <UInputMenu
                id="salutation"
                size="xl"
                :options="options"
                v-model="formData.salutation"
              />
            </div>
            <div class="col-span-2 mb-10 md:mb-0">
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
            <div class="col-span-2">
              <label class="text-xl font-medium mb-2 block" for="surname"
                >Surname *</label
              >
              <UInput
                v-model="formData.surname"
                :ui="{ spacing: 'py-4' }"
                id="surname"
                size="xl"
              />
            </div>
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
              >Town</label
            >
            <UInput
              v-model="formData.town"
              :ui="{ spacing: 'py-4' }"
              id="location"
              size="xl"
            />
          </div>
          <div>
            <label class="text-xl font-medium mb-2 block" for="street name"
              >Street Name</label
            >
            <UInput
              v-model="formData.streetName"
              :ui="{ spacing: 'py-4' }"
              id="street name"
              size="xl"
            />
          </div>
          <div>
            <label class="text-xl font-medium mb-2 block" for="digital address"
              >Digital Address</label
            >
            <UInput
              v-model="formData.digitalAddress"
              :ui="{ spacing: 'py-4' }"
              id="digital address"
              size="xl"
            />
          </div>
        </form>
      </div>
    </UCard>
  </ClientOnly>
</template>
