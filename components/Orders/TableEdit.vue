<script setup lang="ts">
import type { OrderType } from "@/types/order";
const { state } = useEditOrder();

const props = defineProps<{
  order: OrderType;
}>();
const items = [
  [
    {
      label: "Edit",
      click: () => {
        state.value.selectedOrder = props.order;
        state.value.editOrderModal = true;
      },
    },
  ],
  [
    {
      label: "Delete",
    },
  ],
];
</script>

<template>
  <div>
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton color="white" trailing-icon="i-mdi-ellipsis-horizontal" />
    </UDropdown>
  </div>
</template>
