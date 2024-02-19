<script setup lang="ts">
import Calendar from "primevue/calendar";
import { useCreateOrder } from "@/components/App/composables/createOrder";
const { orderData } = useCreateOrder();

const props = defineProps<{
  placeholder?: string;
}>();
</script>

<template>
  <div class="card flex flex-col">
    <Calendar
      :placeholder="placeholder"
      v-model="orderData.deliveryDate"
      dateFormat="dd/mm/yy"
    >
    </Calendar>
  </div>
</template>
