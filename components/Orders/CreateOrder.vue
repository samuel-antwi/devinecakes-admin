<script setup lang="ts">
import { useCreateOrder } from "@/components/App/composables/createOrder";
import type { CustomerType } from "@/types/customers";
const props = defineProps(["customers"]);

const { orderData } = useCreateOrder();
const customer = ref<CustomerType>();

const customerOptions = props.customers.map((customer: CustomerType) => {
  return {
    label:
      customer.salutation + " " + customer.firstName + " " + customer.surname,
    customer: customer,
  };
});

const route = useRoute();
const customerId = route.query.customer_id;
const user = useSupabaseUser();

// Computed properties
const disableAmountReceivedField = computed(() => {
  return orderData.value.paymentStatus !== "Partially Paid";
});

// Get some default valuesser
onMounted(() => {
  customer.value = customerOptions.find(
    (customer: CustomerType) => customer?.customer?.id === customerId
  );
  orderData.value.createdBy = user.value?.email || "";
});

watch(customer, () => {
  if (customer.value) {
    orderData.value.customerId = customer.value?.customer?.id;
  }
});
watch(
  orderData,
  (newVal) => {
    if (newVal) {
      orderData.value.balance =
        orderData.value?.price * orderData.value?.quantity -
        orderData.value?.receivedAmount;
    }
    if (newVal.paymentStatus === "Paid") {
      orderData.value.receivedAmount =
        orderData.value.price * orderData.value.quantity;
    }
    if (newVal.paymentStatus === "Not Paid") {
      orderData.value.receivedAmount = 0;
    }
  },
  { deep: true }
);
</script>
<template>
  <ClientOnly>
    <div class="max-w-2xl">
      <form class="flex flex-col space-y-10">
        <div class="border p-5">
          <label class="text-lg font-medium mb-2 block" for="customer"
            >Customer *</label
          >
          <USelectMenu
            id="customer"
            size="xl"
            searchable
            searchable-placeholder="Search a person..."
            placeholder="Select customer"
            :options="customerOptions"
            v-model="customer"
          />
          <div v-if="customer?.customer?.id" class="mt-3">
            <div class="flex items-center justify-between">
              <h1 class="uppercase text-sm mb-2 text-gray-600">
                Delivery Address
              </h1>
              <span>
                <h1 class="text-gray-600 uppercase text-sm mb-2">Mobile</h1>
                <p>{{ customer?.customer?.mobileNumber }}</p>
              </span>
            </div>
            <p>{{ customer?.customer?.town }}</p>
            <p class="text-gray-600">{{ customer?.customer?.streetName }}</p>
            <p class="text-gray-600">Accra</p>
          </div>
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="cake"
            >Cake *</label
          >
          <UInputMenu
            multiple
            :options="['Wedding Cake', 'Celebration Cake', 'Birthday Cake']"
            v-model="orderData.cakeType"
            :ui="{ spacing: 'py-4' }"
            id="cake"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="price"
            >Price *
          </label>
          <UInput
            type="number"
            v-model="orderData.price"
            id="price"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="cake"
            >Quantity *</label
          >
          <USelectMenu
            :options="[1, 2, 3, 4, 5]"
            v-model="orderData.quantity"
            id="quantity"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="payment status"
            >Payment Status *</label
          >
          <UInputMenu
            :options="['Paid', 'Partially Paid', 'Not Paid']"
            v-model="orderData.paymentStatus"
            id="payment status"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="payment reference"
            >Payment Reference *</label
          >
          <UInput
            :disabled="orderData.paymentStatus === 'Not Paid'"
            v-model="orderData.paymentReference"
            id="payment reference"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="amount"
            >Amount Received
          </label>
          <UInput
            :disabled="disableAmountReceivedField"
            type="number"
            v-model="orderData.receivedAmount"
            id="amount"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="balance due"
            >Balance Due
          </label>
          <UInput
            disabled
            type="number"
            v-model="orderData.balance"
            id="balance due"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="delivery method"
            >Delivery Method</label
          >
          <UInputMenu
            :options="['Shop Pickup', 'Home Delivery']"
            v-model="orderData.deliveryMethod"
            id="delivery method"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="delivery_date"
            >Delivery Date *</label
          >
          <pv-calendar id="delivery_date" />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="description"
            >Description</label
          >
          <UTextarea
            autoresize
            :rows="10"
            v-model="orderData.description"
            id="description"
            size="xl"
          />
        </div>
      </form>
    </div>
  </ClientOnly>
</template>
