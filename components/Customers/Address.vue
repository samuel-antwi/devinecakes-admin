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
            <span>Street:</span>
            <span class="text-gray-950 font-medium ml-1">{{
              customer.streetName
            }}</span>
          </p>
          <p>Accra</p>
          <UDivider class="py-2" />
          <div v-if="customer.digitalAddress" class="text-gray-700 relative">
            <div class="mt-4">
              <h1 class="mb-2">Digital Address</h1>
              <span>DA:</span>
              <span class="text-gray-950 font-medium ml-1">{{
                customer.digitalAddress
              }}</span>
            </div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>
