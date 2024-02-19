<script setup lang="ts">
import type { OrderType } from "@/types/order";
import { useGlobalStore } from "@/composables/globalStore";
import { useToast } from "primevue/usetoast";
import { isEqual, cloneDeep } from "lodash-es";
import { formatDate } from "@/utils/date-format";

const toast = useToast();

const props = defineProps<{
  order: OrderType;
}>();

const { editOrderModal } = useGlobalStore();

// make deep copy of customer object
// const formData = ref<OrderType>(JSON.parse(JSON.stringify(props.order)));
const formData = ref<OrderType>(cloneDeep(props.order));

const canSaveChanges = computed(() => {
  return !isEqual(props.order, formData.value);
});

const closeModal = () => {
  if (canSaveChanges.value) {
    if (confirm("You have unsaved changes. Are you sure you want to close?")) {
      editOrderModal.value = false;
    }
  }
};

const loading = ref(false);
async function handleSubmit() {
  loading.value = true;
  try {
    const order = await $fetch("/api/orders/update", {
      method: "PUT",
      body: formData.value,
    });

    loading.value = false;
    editOrderModal.value = false;
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
</script>

<template>
  <div>
    <UModal v-model="editOrderModal" prevent-close>
      <UCard>
        <template #header>
          <h1 class="text-lg font-medium">Edit Order</h1>
          <UButton
            @click="editOrderModal = false"
            icon="i-heroicons-x-mark"
            class="absolute right-4 top-4"
            color="white"
          />
        </template>
        <form>
          <div class="flex items-center space-x-4 mb-10">
            <div class="w-full">
              <label
                class="text-lg font-medium mb-2 block"
                for="payment reference"
                >Payment Reference *</label
              >
              <UInput
                v-model="formData.paymentReference"
                id="payment reference"
                size="lg"
              />
            </div>
            <div class="w-full">
              <label class="text-lg font-medium mb-2 block" for="amount"
                >Amount *</label
              >
              <UInput
                type="number"
                v-model="formData.amount"
                id="amount"
                size="lg"
              />
            </div>
          </div>
          <div class="flex items-center space-x-4 mb-10">
            <div class="w-full">
              <label class="text-lg font-medium mb-2 block" for="payment status"
                >Payment Status *</label
              >
              <UInputMenu
                :options="['Fully Paid', 'Half Paid', 'Not Paid']"
                v-model="formData.paymentStatus"
                id="payment status"
                size="lg"
              />
            </div>
            <div class="w-full">
              <label class="text-lg font-medium mb-2 block" for="cake"
                >Cake *</label
              >
              <UInputMenu
                multiple
                :options="[
                  'Wedding cake',
                  'Celebration cake',
                  'Birthday cake',
                  'Other',
                ]"
                v-model="formData.cakeType"
                :ui="{ spacing: 'py-4' }"
                id="cake"
                size="lg"
              />
            </div>
          </div>
          <div class="flex items-center space-x-4 mb-10">
            <div class="w-full">
              <label class="text-lg font-medium mb-2 block" for="cake"
                >Quantity</label
              >
              <UInputMenu
                :options="['1', '2', '3', '4', '5']"
                v-model="formData.quantity"
                id="quantity"
                size="lg"
              />
            </div>
            <div class="w-full">
              <label
                class="text-lg font-medium mb-2 block"
                for="delivery method"
                >Delivery Method</label
              >
              <UInputMenu
                :options="['Shop pickup', 'Home delivery']"
                v-model="formData.deliveryMethod"
                id="delivery method"
                size="lg"
              />
            </div>
          </div>
          <div class="mb-10">
            <label class="text-lg font-medium block mb-2" for="calender"
              >Delivery Date *</label
            >
            <pv-calendar
              :placeholder="
                formData.orderDate ? formatDate(formData.orderDate) : ''
              "
            />
          </div>
          <div>
            <label class="text-lg font-medium mb-2 block" for="description"
              >Description</label
            >
            <UTextarea
              autoresize
              :rows="5"
              v-model="formData.description"
              id="description"
              size="lg"
            />
          </div>
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
