<script setup lang="ts">
import type { OrderType } from "@/types/order";
import { formatDate } from "@/utils/date-format";
import type { CustomerType } from "~/types/customers";
const props = defineProps<{
  order: OrderType;
}>();

const customerDetails = ref<CustomerType | null>(null);

onMounted(() => {
  customerDetails.value = props.order.customer ?? null;
});

const statusClass = (data: any) => {
  return [
    "px-2 py-1 capitalize text-base font-medium shadow rounded-md",
    {
      "bg-yellow-50 text-yellow-700": data === "pending",
      "bg-green-50 text-green-700": data === "delivered",
      "bg-red-50 text-red-700": data === "cancelled",
    },
  ];
};
</script>

<template>
  <div class="my-12 max-w-3xl mx-auto">
    <div class="md:flex items-center justify-between">
      <div>
        <h1 class="text-2xl mb-3 text-gray-800">PURCHASE ORDER</h1>
        <p class="text-gray-800 mb-3">
          Purchase Order#
          <span class="font-medium text-gray-950">{{
            order?.orderNumber
          }}</span>
        </p>
        <UBadge
          :ui="{ rounded: 'rounded-full' }"
          :class="statusClass(order.orderStatus)"
          >{{ order.orderStatus }}</UBadge
        >
        <div class="mt-4">
          <div class="flex items-center justify-between mb-2">
            <p class="uppercase mr-12 text-gray-800 text-sm font-medium">
              Order Date
            </p>
            <p>{{ formatDate(order.orderDate ?? "") }}</p>
          </div>
          <div class="flex items-center justify-between mb-2">
            <p class="uppercase mr-12 text-gray-800 text-sm font-medium">
              Delivery Date
            </p>
            <p>{{ formatDate(order.deliveryDate ?? "") }}</p>
          </div>
          <div class="flex items-center justify-between mb-2">
            <p class="uppercase mr-12 text-gray-800 text-sm font-medium">
              Payment status
            </p>
            <p
              class="bg-green-50 px-2 py-1 capitalize text-xs font-medium shadow rounded-md text-green-700"
            >
              {{ order.paymentStatus }}
            </p>
          </div>
          <div class="flex items-center justify-between mb-2">
            <p class="uppercase mr-12 text-gray-800 text-sm font-medium">
              Payment ref #
            </p>
            <p class="text-primary">{{ order.paymentReference }}</p>
          </div>
        </div>
      </div>
      <div class="mt-8 md:mt-0">
        <h1 class="mb-3 text-sm font-medium uppercase">Customer Address</h1>
        <NuxtLink :to="`/admin/content/customers/${customerDetails?.id}`">
          <div class="flex space-x-1 text-primary mb-3">
            <span v-show="customerDetails?.salutation"
              >{{ customerDetails?.salutation }}.</span
            >
            <span>{{ customerDetails?.firstName }}</span>
            <span>{{ customerDetails?.surname }}</span>
          </div>
        </NuxtLink>
        <p>{{ customerDetails?.town }}</p>
        <p class="mb-4">{{ customerDetails?.streetName }}</p>
        <p>Accra</p>
        <p>{{ customerDetails?.mobileNumber }}</p>
        <div class="mt-5" v-if="customerDetails?.digitalAddress">
          <h1 class="uppercase text-sm font-medium mb-2">Digital Address</h1>
          <p class="text-gray-800">{{ customerDetails?.digitalAddress }}</p>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <h1 class="uppercase text-sm font-medium mb-2">Order Placed By</h1>
      <div>
        <p>{{ order.createdBy }}</p>
      </div>
    </div>
    <orders-total-order :order="order" />
    <div class="mt-10">
      <h1 class="uppercase text-sm font-medium mb-2">Order Note</h1>
      <div class="border py-3 px-4 rounded">
        <p v-if="order.description">{{ order.description }}</p>
        <p v-else>No note</p>
      </div>
    </div>
  </div>
</template>
