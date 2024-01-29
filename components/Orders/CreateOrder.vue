<script setup lang="ts">
import { useCreateOrder } from "@/components/App/composables/createOrder";

const { orderData } = useCreateOrder();
const options = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
  "Caroline Schultz",
  "Mason Heaney",
  "Claudie Smitham",
  "Emil Schaefer",
];
const selected = ref([]);
const quantityOptions = ["1", "2", "3", "4", "5"];
</script>
<template>
  <ClientOnly>
    <div class="max-w-2xl">
      <form class="flex flex-col space-y-10">
        <div>
          <label class="text-lg font-medium mb-2 block" for="customer"
            >Customer *</label
          >
          <USelectMenu
            id="customer"
            size="xl"
            searchable
            searchable-placeholder="Search a person..."
            placeholder="Select a person"
            :options="[
              'Wade Cooper',
              'Arlene Mccoy',
              'Devon Webb',
              'Tom Cook',
              'Tanya Fox',
              'Hellen Schmidt',
              'Caroline Schultz',
              'Mason Heaney',
              'Claudie Smitham',
              'Emil Schaefer',
            ]"
            model-value="Tom Cook"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="payment reference"
            >Payment Reference *</label
          >
          <UInput
            type="number"
            v-model="orderData.paymentReferenceNumber"
            id="payment reference"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="payment status"
            >Payment Status *</label
          >
          <UInputMenu
            :options="['Fully Paid', 'Half Paid', 'Not Paid']"
            v-model="orderData.paymentStatus"
            id="payment status"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="cake"
            >Cake *</label
          >
          <USelectMenu
            multiple
            :options="options"
            v-model="selected"
            :ui="{ spacing: 'py-4' }"
            id="cake"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="cake"
            >Quantity</label
          >
          <USelectMenu
            :options="quantityOptions"
            v-model="orderData.quantity"
            id="quantity"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="delivery method"
            >Delivery Method</label
          >
          <UInputMenu
            :options="['Pickup', 'Home Delivery']"
            v-model="orderData.deliveryMethod"
            id="delivery method"
            size="xl"
          />
        </div>
        <div>
          <pv-calendar />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="extras"
            >Extras</label
          >
          <USelectMenu
            multiple
            :options="options"
            v-model="selected"
            id="extras"
            size="xl"
            placeholder="Select extras"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="description"
            >Description</label
          >
          <UTextarea
            autoresize
            :rows="10"
            v-model="orderData.description"
            id="description"
            size="xl"
          />
        </div>
      </form>
    </div>
  </ClientOnly>
</template>
