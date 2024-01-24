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
  <div class="max-w-2xl">
    <form class="flex flex-col space-y-10">
      <div>
        <label class="text-xl font-medium mb-2 block" for="payment reference"
          >Payment Reference *</label
        >
        <UInput
          icon="i-heroicons-ticket"
          v-model="orderData.paymentReferenceNumber"
          :ui="{ spacing: 'py-4' }"
          id="payment reference"
          size="xl"
        />
      </div>
      <div>
        <label class="text-xl font-medium mb-2 block" for="payment status"
          >Payment Status *</label
        >
        <UInputMenu
          icon="i-heroicons-banknotes"
          :options="['Fully Paid', 'Half Paid', 'Not Paid']"
          v-model="orderData.paymentStatus"
          :ui="{ spacing: 'py-4' }"
          id="payment status"
          size="xl"
        />
      </div>
      <div>
        <label class="text-xl font-medium mb-2 block" for="cake">Cake *</label>
        <USelectMenu
          icon="i-heroicons-cake"
          multiple
          :options="options"
          v-model="selected"
          :ui="{ spacing: 'py-4' }"
          id="cake"
          size="xl"
        />
      </div>
      <div>
        <label class="text-xl font-medium mb-2 block" for="cake"
          >Quantity</label
        >
        <USelectMenu
          icon="i-heroicons-calculator"
          :options="quantityOptions"
          v-model="orderData.quantity"
          :ui="{ spacing: 'py-4' }"
          id="quantity"
          size="xl"
        />
      </div>
      <div>
        <label class="text-xl font-medium mb-2 block" for="delivery method"
          >Delivery Method</label
        >
        <UInputMenu
          icon="i-heroicons-truck"
          :options="['Pickup', 'Home Delivery']"
          v-model="orderData.deliveryMethod"
          :ui="{ spacing: 'py-4' }"
          id="delivery method"
          size="xl"
        />
      </div>
      <div>
        <label class="text-xl font-medium mb-2 block" for="delivery date"
          >Delivery Date *</label
        >
        <USelectMenu
          icon="i-heroicons-calendar"
          multiple
          :options="options"
          v-model="selected"
          :ui="{ spacing: 'py-4' }"
          id="delivery date"
          size="xl"
        />
      </div>
      <div>
        <label class="text-xl font-medium mb-2 block" for="extras"
          >Extras</label
        >
        <USelectMenu
          multiple
          :options="options"
          v-model="selected"
          :ui="{ spacing: 'py-4' }"
          id="extras"
          size="xl"
          placeholder="Select extras"
        />
      </div>
      <div>
        <label class="text-xl font-medium mb-2 block" for="description"
          >Description</label
        >
        <UTextarea
          :rows="7"
          v-model="orderData.description"
          :ui="{ spacing: 'py-4' }"
          id="description"
          size="xl"
        />
      </div>
    </form>
  </div>
</template>
