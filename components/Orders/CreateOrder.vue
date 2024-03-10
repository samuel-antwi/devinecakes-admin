<script setup lang="ts">
import { useCreateOrder } from "@/components/App/composables/createOrder";
import type { CustomerType } from "@/types/customers";
const props = defineProps(["customers"]);
const emit = defineEmits(["createOrder"]);

const { orderData, canCreateOrder } = useCreateOrder();
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
  console.log("customer", customer.value);
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

// Emits
const handleCreateOrder = () => {
  emit("createOrder", orderData.value);
};
</script>
<template>
  <ClientOnly>
    <div class="max-w-4xl px-4 md:px-8">
      <form class="flex flex-col space-y-10">
        <UCard>
          <div class="flex items-center mb-5">
            <UIcon
              v-show="customer?.customer?.id"
              class="mr-2 text-xl text-green-600"
              name="i-heroicons-check-circle"
            />
            <h1 class="font-medium">Customer details</h1>
          </div>
          <label class="text-lg font-medium mb-2 block" for="customer"
            >Name *</label
          >
          <USelectMenu
            id="customer"
            size="lg"
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
        </UCard>
        <UCard>
          <div class="flex items-center mb-5">
            <UIcon
              v-show="
                orderData.cakeType && orderData.price && orderData.quantity
              "
              class="mr-2 text-xl text-green-600"
              name="i-heroicons-check-circle"
            />
            <h1 class="font-medium">Product details</h1>
          </div>
          <div class="mb-4">
            <label class="text-lg font-medium mb-2 block" for="cake"
              >Cake *</label
            >
            <UInputMenu
              multiple
              :options="['Wedding Cake', 'Celebration Cake', 'Birthday Cake']"
              v-model="orderData.cakeType"
              :ui="{ spacing: 'py-4' }"
              id="cake"
              size="lg"
            />
          </div>
          <div class="mb-4">
            <label class="text-lg font-medium mb-2 block" for="price"
              >Price *
            </label>
            <UInput
              type="number"
              v-model="orderData.price"
              id="price"
              size="lg"
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
              size="lg"
            />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-center mb-5">
            <UIcon
              v-show="
                orderData.paymentStatus &&
                orderData.paymentReference &&
                orderData.receivedAmount
              "
              class="mr-2 text-xl text-green-600"
              name="i-heroicons-check-circle"
            />
            <h1 class="font-medium">Payment details</h1>
          </div>
          <div class="mb-4">
            <label class="text-lg font-medium mb-2 block" for="payment status"
              >Payment Status *</label
            >
            <UInputMenu
              :options="['Paid', 'Partially Paid', 'Not Paid']"
              v-model="orderData.paymentStatus"
              id="payment status"
              size="lg"
            />
          </div>
          <div class="mb-4">
            <label
              class="text-lg font-medium mb-2 block"
              for="payment reference"
              >Payment Reference *</label
            >
            <UInput
              :disabled="orderData.paymentStatus === 'Not Paid'"
              v-model="orderData.paymentReference"
              id="payment reference"
              size="lg"
            />
          </div>
          <div class="mb-4">
            <label class="text-lg font-medium mb-2 block" for="amount"
              >Amount Received
            </label>
            <UInput
              :disabled="disableAmountReceivedField"
              type="number"
              v-model="orderData.receivedAmount"
              id="amount"
              size="lg"
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
              size="lg"
            />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-center mb-5">
            <UIcon
              v-show="orderData.deliveryDate"
              class="mr-2 text-xl text-green-600"
              name="i-heroicons-check-circle"
            />
            <h1 class="font-medium">Shipment details</h1>
          </div>
          <div class="mb-4">
            <label class="text-lg font-medium mb-2 block" for="delivery_date"
              >Delivery Date *</label
            >
            <pv-calendar id="delivery_date" />
          </div>
          <div>
            <label class="text-lg font-medium mb-2 block" for="delivery method"
              >Delivery Method</label
            >
            <UInputMenu
              :options="['Shop Pickup', 'Home Delivery']"
              v-model="orderData.deliveryMethod"
              id="delivery method"
              size="lg"
            />
          </div>
        </UCard>
        <UCard>
          <div class="flex items-center mb-5">
            <UIcon
              v-show="orderData.description"
              class="mr-2 text-xl text-green-600"
              name="i-heroicons-check-circle"
            />
            <h1 class="font-medium">Additional details</h1>
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
              size="lg"
            />
          </div>
        </UCard>
        <!-- This is only for mobile view -->
        <div class="lg:hidden px-4">
          <UButton
            @click="handleCreateOrder"
            block
            size="lg"
            :ui="{ rounded: 'rounded-full' }"
            label="Create Order"
            :disabled="!canCreateOrder"
          >
            Create Order
          </UButton>
        </div>
      </form>
    </div>
  </ClientOnly>
</template>
