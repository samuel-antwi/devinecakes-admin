<script setup lang="ts">
import Calendar from "primevue/calendar";
import { useCreateOrder } from "@/components/App/composables/createOrder";
const { orderData } = useCreateOrder();

const minDate = ref(new Date());
const myInputStyle = ref({
  input:
    "relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-xl px-3.5 py-4 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 pe-12",
});

const props = defineProps<{
  placeholder?: string;
}>();
</script>

<template>
  <div class="card flex flex-col">
    <Calendar
      :pt="myInputStyle"
      :minDate="minDate"
      :manualInput="false"
      :placeholder="props.placeholder"
      v-model="orderData.deliveryDate"
      dateFormat="dd M yy"
      inputId="delivery_date"
    />
  </div>
</template>
