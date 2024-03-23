<script setup lang="ts">
import type { OrderType } from "@/types/order";
import { useToast } from "primevue/usetoast";
import { isEqual, cloneDeep } from "lodash-es";
import Calendar from "primevue/calendar";

const toast = useToast();
const minDate = ref(new Date());
const myInputStyle = ref({
  input:
    "relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 pe-12",
});

const props = defineProps<{
  order: OrderType;
}>();

const { state } = useEditOrder();

// make deep copy of customer object
// const formData = ref<OrderType>(cloneDeep(props.order));
const formData = ref<OrderType>(cloneDeep(state.value.selectedOrder));

const canSaveChanges = computed(() => {
  return !isEqual(props.order, formData.value);
});

// Format delivery date
const formattedDeliveryDate = computed({
  get() {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(formData.value.deliveryDate).toLocaleDateString(
      undefined,
      options
    );
  },
  set(newValue) {
    formData.value.deliveryDate = newValue;
  },
});

const closeModal = () => {
  if (canSaveChanges.value) {
    if (confirm("You have unsaved changes. Are you sure you want to close?")) {
      state.value.editOrderModal = false;
    }
  } else {
    state.value.editOrderModal = false;
  }
};

const loading = ref(false);
async function handleSubmit() {
  loading.value = true;
  try {
    await $fetch("/api/orders/update", {
      method: "PUT",
      body: formData.value,
    });

    loading.value = false;
    state.value.editOrderModal = false;
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Order updated.",
      life: 4000,
    });
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error updating order. Please try again.",
      life: 4000,
    });
    throw new Error(e.message);
  }
}

// Computed property for balance
const totalAmount = computed(() => {
  return (formData.value.quantity ?? 0) * (formData.value.price ?? 0);
});
const balance = computed(() => {
  return (totalAmount.value ?? 0) - (formData.value.receivedAmount ?? 0);
});

// Watchers
// Whenever balance changes, update it in formData
watch(balance, (newBalance) => {
  formData.value.balance = newBalance;
});

watch(
  () => [
    formData.value.paymentStatus,
    formData.value.deliveryDate,
    formData.value.quantity,
    formData.value.price,
  ],
  ([paymentStatus]) => {
    // Recalculate totalAmount whenever quantity or price changes
    // If paymentStatus is 'Paid', set receivedAmount to totalAmount and balance to 0
    if (paymentStatus === "Paid" || paymentStatus === "paid") {
      formData.value.receivedAmount = totalAmount.value;
      formData.value.balance = 0;
    } else {
      // Otherwise, calculate balance as totalAmount - receivedAmount
      formData.value.balance =
        totalAmount.value - (formData.value.receivedAmount ?? 0);
    }
    // If deliveryDate is in the future, set orderStatus to 'Pending'
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(formData.value.deliveryDate) > today) {
      formData.value.orderStatus = "Pending";
    }
  },
  { immediate: true }
);
watch(
  props.order,
  (newOrder) => {
    formData.value = cloneDeep(newOrder);
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <UModal v-model="state.editOrderModal" prevent-close>
      <UCard>
        <template #header>
          <h1 class="text-lg font-medium">Edit Order</h1>
          <UButton
            @click="closeModal"
            icon="i-heroicons-x-mark"
            class="absolute right-4 top-4"
            color="white"
          />
        </template>
        <form>
          <UCard class="mb-10">
            <h1 class="mb-5 font-medium">Product Details</h1>
            <div class="flex items-center space-x-4 mb-10">
              <div class="w-full">
                <label class="text-sm font-medium mb-2 block" for="cake"
                  >Cake *</label
                >
                <UInputMenu
                  class="capitalize"
                  multiple
                  :options="[
                    'Wedding Cake',
                    'Celebration Cake',
                    'Birthday Cake',
                  ]"
                  v-model="formData.cakeType"
                  :ui="{ spacing: 'py-4' }"
                  id="cake"
                  size="md"
                />
              </div>
              <div class="w-full">
                <label class="text-sm font-medium mb-2 block" for="amount"
                  >Price*</label
                >
                <UInput
                  type="number"
                  v-model="formData.price"
                  id="amount"
                  size="md"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-full">
                <label class="text-sm font-medium mb-2 block" for="cake"
                  >Quantity</label
                >
                <UInputMenu
                  :options="['1', '2', '3', '4', '5']"
                  v-model="formData.quantity"
                  id="quantity"
                  size="md"
                />
              </div>
            </div>
          </UCard>
          <UCard class="mb-10">
            <h1 class="mb-5 font-medium">Order Status</h1>
            <div class="w-full">
              <label class="text-sm font-medium mb-2 block" for="order status"
                >Status</label
              >
              <UInputMenu
                :ui="{ textTransform: 'capitalize' }"
                :options="['Delivered', 'Pending']"
                v-model="formData.orderStatus"
                id="order status"
                size="md"
              />
            </div>
          </UCard>
          <UCard class="mb-10">
            <h1 class="mb-5 font-medium">Payment Details</h1>
            <div class="flex items-center space-x-4 mb-10">
              <div class="w-full">
                <label
                  class="text-sm font-medium mb-2 block"
                  for="payment status"
                  >Payment Status *</label
                >
                <UInputMenu
                  :options="['Paid', 'Partially Paid', 'Not Paid']"
                  v-model="formData.paymentStatus"
                  id="payment status"
                  size="md"
                />
              </div>
              <div class="w-full">
                <label
                  class="text-sm font-medium mb-2 block"
                  for="payment reference"
                  >Payment Reference *</label
                >
                <UInput
                  v-model="formData.paymentReference"
                  id="payment reference"
                  size="md"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-full">
                <label
                  class="text-sm font-medium mb-2 block"
                  for="amount received"
                  >Amount received</label
                >
                <UInput
                  :disabled="formData.paymentStatus === 'not paid'"
                  type="number"
                  :ui="{ textTransform: 'capitalize' }"
                  v-model="formData.receivedAmount"
                  id="amount received"
                  size="md"
                />
              </div>
              <div class="w-full">
                <label class="text-sm font-medium mb-2 block" for="balance"
                  >Balance</label
                >
                <UInput
                  type="number"
                  :ui="{ textTransform: 'capitalize' }"
                  v-model="formData.balance"
                  id="balance"
                  size="md"
                />
              </div>
            </div>
          </UCard>
          <UCard class="mb-10">
            <h1 class="mb-5 font-medium">Delivery Details</h1>
            <div class="flex items-center space-x-4">
              <div class="w-full">
                <label class="text-sm font-medium block mb-2" for="calender"
                  >Delivery Date *</label
                >
                <Calendar
                  class="w-full"
                  :pt="myInputStyle"
                  :minDate="minDate"
                  :manualInput="false"
                  v-model="formattedDeliveryDate"
                  dateFormat="dd M yy"
                  inputId="delivery_date"
                />
              </div>
              <div class="w-full">
                <label
                  class="text-sm font-medium mb-2 block"
                  for="delivery method"
                  >Delivery Method</label
                >
                <UInputMenu
                  :options="['Shop Pickup', 'Home Delivery']"
                  v-model="formData.deliveryMethod"
                  id="delivery method"
                  size="md"
                >
                </UInputMenu>
              </div>
            </div>
          </UCard>
          <UCard>
            <h1 class="mb-5 font-medium">Delivery Details</h1>
            <div>
              <label class="text-sm font-medium mb-2 block" for="description"
                >Description</label
              >
              <UTextarea
                autoresize
                :rows="5"
                v-model="formData.description"
                id="description"
                size="md"
              />
            </div>
          </UCard>
        </form>
        <template #footer>
          <div class="flex items-center space-x-2">
            <UButton
              :disabled="!canSaveChanges"
              @click="handleSubmit"
              type="button"
              label="Save"
            />
            <UButton @click="closeModal" color="white" label="Cancel" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
