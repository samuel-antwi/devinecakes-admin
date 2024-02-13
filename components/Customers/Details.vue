<script setup lang="ts">
import type { CustomerType } from "@/types/customers";
import { useGlobalStore } from "@/composables/globalStore";

const { isOpen } = useGlobalStore();

const props = defineProps<{
  customer: CustomerType;
}>();
</script>
<template>
  <div>
    <div v-if="isOpen">
      <customers-edit-customer :customer="customer" :isOpen="isOpen" />
    </div>
    <div class="flex">
      <div class="border w-12 h-12 flex items-center justify-center rounded">
        <UIcon name=" i-heroicons-user" class="text-3xl" />
      </div>
      <div class="ml-12">
        <h1 clas class="flex items-center space-x-1">
          <span>{{ customer.salutation }}.</span>
          <span>{{ customer.firstName }}</span>
          <span>{{ customer.surname }}</span>
        </h1>
        <div class="flex items-center py-1">
          <UIcon
            name="i-heroicons-device-phone-mobile"
            class="text-gray-600 text-lg mr-1"
          />
          <p>{{ customer.mobileNumber }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
