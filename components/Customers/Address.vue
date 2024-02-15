<script setup lang="ts">
import type { CustomerType } from "@/types/customers";
import Accordion from "primevue/accordion";

const props = defineProps<{
  customer: CustomerType;
}>();
</script>
<template>
  <div class="max-w-lg">
    <Accordion :activeIndex="0">
      <AccordionTab header="ADDRESS">
        <div class="text-gray-700 relative">
          <p class="mb-2">Delivery Address</p>
          <p v-if="customer.town">
            <span>Town:</span>
            <span class="text-gray-950 font-medium ml-1">{{
              customer.town
            }}</span>
          </p>
          <p v-if="customer.streetName">
            <span>Street Name:</span>
            <span class="text-gray-950 font-medium ml-1">{{
              customer.streetName
            }}</span>
          </p>
          <div>
            <span>Region: </span>
            <span class="text-gray-950 font-medium">Accra</span>
          </div>
          <UDivider class="py-2" />
          <div v-if="customer.digitalAddress" class="text-gray-700 relative">
            <div class="mt-4">
              <div class="flex items-center mb-2">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="text-gray-950 text-lg mr-2"
                />
                <h1>Digital Address</h1>
              </div>
              <span class="text-gray-950 font-medium">{{
                customer.digitalAddress
              }}</span>
            </div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>
