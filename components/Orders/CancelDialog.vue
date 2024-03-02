<script setup lang="ts">
import type { OrderType } from "@/types/order";
const props = defineProps<{
  order: OrderType;
}>();

const emits = defineEmits(["cancel"]);

const cancelOrder = () => {
  emits("cancel");
};

const isCancelOpen = defineModel("isCancelOpen");
const checked = defineModel("checked");

// Does the order have a payment associated with it?
const orderWithPayment = computed(() => {
  return (
    props.order.paymentStatus === "paid" ||
    props.order.paymentStatus === "part paid"
  );
});
</script>

<template>
  <UModal v-model="isCancelOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center mb-3">
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="text-red-500 text-xl mr-2"
            />
            <h1 class="text-lg font-medium">Warning: Order Cancellation</h1>
          </div>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark"
            class="-my-1 text-xl"
            @click="isCancelOpen = false"
          />
        </div>
      </template>
      <div v-if="orderWithPayment">
        <p class="mb-3">
          You are about to cancel order
          <span class="text-primary">{{ order.orderNumber }}</span>
          that has a payment associated with it. Please be aware of the
          following:
        </p>
        <p>
          The payment status for this order will be automatically set as
          <span class="text-primary">Refunded</span>. Tick the box below if the
          customer is not elegible for refund.
        </p>
        <div class="mt-3">
          <UCheckbox label="Not eligible for refund" v-model="checked" />
        </div>
      </div>
      <div v-else>
        <p>
          Are you sure you want to cancel order
          <span class="text-primary">{{ order.orderNumber }}</span> ?
        </p>
      </div>
      <div class="flex justify-end mt-4 space-x-2">
        <UButton @click="cancelOrder" color="primary" label="Cancel Order" />
      </div>
    </UCard>
  </UModal>
</template>
