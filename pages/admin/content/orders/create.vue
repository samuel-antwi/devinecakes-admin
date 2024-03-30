<script setup lang="ts">
import type { CustomerType } from "@/types/customers";
import { useCreateOrder } from "@/components/App/composables/createOrder";
import { useToast } from "primevue/usetoast";

definePageMeta({
  layout: "auth",
});

const loading = ref(false);
const { orderData, canCreateOrder } = useCreateOrder();
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
    const res = await $fetch("/api/orders/create-order", {
      method: "POST",
      body: orderData.value,
    });
    loading.value = false;

    if (res.statusCode !== 200) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Error creating order, duplicate invoice number.",
        life: 10000,
      });
      return;
    }

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Order created.",
      life: 4000,
    });
    orderData.value = {
      orderNumber: "",
      orderDate: "",
      customerId: "",
      paymentStatus: "",
      deliveryMethod: "",
      deliveryDate: "",
      paymentReference: "",
      cakeType: "",
      description: "",
      amount: 0,
      quantity: 0,
      receivedAmount: 0,
      price: 0,
    };
    await router.push("/admin/content/orders");
  } catch (e) {
    console.log(e);
  }
}
</script>
<template>
  <div class="mb-10">
    <app-actions
      class="px-4 lg:px-8"
      :title="'Creating an Order'"
      :icon="'i-mdi-shopping-outline'"
      :can-go-back="true"
    >
      <template #actions>
        <app-buttons-save-button
          class="fixed top-5 hidden lg:block z-20 right-10"
          @save-item="createOrder"
          :can-save="!loading && canCreateOrder"
        />
      </template>
    </app-actions>
    <UDivider class="py-5" />
    <div class="mb-10">
      <div>
        <h1 class="px-4 text-lg lg:hidden mb-5 font-semibold text-center">
          Creating an Order
        </h1>
      </div>
      <orders-create-order :customers @create-order="createOrder" />
    </div>
  </div>
</template>
