<script setup lang="ts">
import type { CustomerType } from "~/types/customers";
import { useCreateOrder } from "@/components/App/composables/createOrder";
import { useToast } from "primevue/usetoast";

definePageMeta({
  layout: "auth",
});

const loading = ref(false);
const { orderData } = useCreateOrder();
const router = useRouter();
const toast = useToast();

// Function that generates 6 random numbers and append 'DV' to it at the start
async function generateOrderNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  const generatedOrderNumber = `DC${random}`;
  orderData.value.orderNumber = generatedOrderNumber;
}

// Get all customers
const { data: customers } = await useFetch<CustomerType>(
  `/api/customers/customers`
);

// Create an order
async function createOrder() {
  loading.value = true;
  try {
    await generateOrderNumber();
    await $fetch("/api/orders/create-order", {
      method: "POST",
      body: orderData.value,
    });

    await router.push(`/admin/content/orders`);

    loading.value = false;
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Order created.",
      life: 4000,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
}
</script>
<template>
  <div>
    <app-actions
      :title="'Creating an Order'"
      :icon="'i-heroicons-shopping-bag'"
      :can-go-back="true"
    >
      <template #actions>
        <app-buttons-save-button @save-item="createOrder" :can-save="true" />
      </template>
    </app-actions>
    <div class="mb-10">
      <orders-create-order :customers="customers" />
    </div>
  </div>
</template>
