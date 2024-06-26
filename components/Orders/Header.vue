<script setup lang="ts">
import type { OrderType } from "@/types/order";
import { useDeleteAction } from "@/composables/deleteAction";
import { useToast } from "primevue/usetoast";

const props = defineProps<{
  order: OrderType;
}>();

const route = useRoute();

const toast = useToast();
const isCancelOpen = ref(false);
const checked = ref(false);
const cancelData = ref({
  orderStatus: "cancelled",
  paymentStatus: "refunded",
  id: route.params.id,
});

const { userPermissions } = usePermissions();
const { state } = useEditOrder();

const id = route.params.id;
const params = {
  id: id.toString(),
  endpoint: "/api/orders/delete-order",
  successMessage: "Order deleted",
  errorMessage: "Error deleting order",
  callBackUrl: "/admin/content/orders",
};

const { isDeleteOpen } = useDeleteAction(params);

const items = [
  [
    {
      label: "Edit",
      click: () => {
        handleEdit();
      },
      disabled:
        props.order.orderStatus === "cancelled" ||
        props.order.orderStatus === "delivered",
    },
  ],
  [
    {
      label: "Cancel Order",
      click: () => {
        isCancelOpen.value = true;
      },
      disabled:
        props.order.orderStatus === "cancelled" ||
        props.order.orderStatus === "delivered",
    },
  ],
  [
    {
      label: "Delete",
      click: () => {
        isDeleteOpen.value = true;
      },
    },
  ],
];

const router = useRouter();

const handleGoBack = () => {
  router.go(-1);
};

const handleEdit = () => {
  state.value.editOrderModal = true;
};

watch(checked, (newVal) => {
  if (newVal) {
    cancelData.value.paymentStatus = "no refund";
  }
});

const handleCancelOrder = async () => {
  await $fetch(`/api/orders/cancel`, {
    method: "put",
    body: cancelData.value,
  });
  isCancelOpen.value = false;
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Order cancelled.",
    life: 4000,
  });
};
</script>
<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <UIcon
        @click="handleGoBack"
        name="i-heroicons-chevron-left"
        class="text-2xl cursor-pointer mr-3 hover:text-primary"
      />
      <div v-if="order?.orderNumber">
        <h1 class="font-medium space-x-2 text-2xl text-gray-800">
          {{ order?.orderNumber }}
        </h1>
      </div>
    </div>

    <div class="flex items-center space-x-2 md:space-x-3">
      <!-- <button
        class="bg-gray-100 group flex items-center px-2 rounded border text-gray-900"
        type="button"
      >
        <UIcon
          name="i-heroicons-printer"
          class="text-gray-600 group-hover:text-primary mr-1.5"
        />
        <span class="group-hover:text-primary">Print</span>
      </button> -->
      <UDropdown
        v-if="userPermissions.adminRole"
        :items="items"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton>
          <span>More</span>
          <UIcon name="i-heroicons-chevron-down" class="text-lg" />
        </UButton>
      </UDropdown>
    </div>
    <DeleteDialog
      v-if="isDeleteOpen"
      :title="'Delete Order'"
      :message="'Are you sure you want to delete this order? This action cannot be undone.'"
      :params="params"
      :call-back-url="'/admin/content/orders'"
    />
    <orders-cancel-dialog
      :order="order"
      @cancel="handleCancelOrder"
      v-model:is-cancel-open="isCancelOpen"
      v-model:checked="checked"
    />
  </div>
</template>
