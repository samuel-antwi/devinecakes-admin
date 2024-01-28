<template>
  <div class="card flex flex-col">
    <label class="text-lg font-medium block mb-2" for="calender"
      >Delivery Date *</label
    >
    <Calendar v-model="orderData.deliveryDate" dateFormat="dd/mm/yy">
    </Calendar>
  </div>
</template>

<script setup>
import Calendar from "primevue/calendar";
import { useCreateOrder } from "@/components/App/composables/createOrder";

const { orderData } = useCreateOrder();
</script>
