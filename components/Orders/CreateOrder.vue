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

const selected = ref([]);
const quantityOptions = ["1", "2", "3", "4", "5"];

const route = useRoute();
const customerId = route.query.customer_id;

onMounted(() => {
  customer.value = customerOptions.find(
    (customer: CustomerType) => customer?.customer?.id === customerId
  );
});
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
          <label class="text-lg font-medium mb-2 block" for="payment reference"
            >Payment Reference *</label
          >
          <UInput
            type="number"
            v-model="orderData.paymentReferenceNumber"
            id="payment reference"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="payment status"
            >Payment Status *</label
          >
          <UInputMenu
            :options="['Fully Paid', 'Half Paid', 'Not Paid']"
            v-model="orderData.paymentStatus"
            id="payment status"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="cake"
            >Cake *</label
          >
          <USelectMenu
            multiple
            :options="[
              'Wedding cake',
              'Celebration cake',
              'Birthday cake',
              'Other',
            ]"
            v-model="selected"
            :ui="{ spacing: 'py-4' }"
            id="cake"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="cake"
            >Quantity</label
          >
          <USelectMenu
            :options="quantityOptions"
            v-model="orderData.quantity"
            id="quantity"
            size="xl"
          />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="delivery method"
            >Delivery Method</label
          >
          <UInputMenu
            :options="['Shop pickup', 'Home delivery']"
            v-model="orderData.deliveryMethod"
            id="delivery method"
            size="xl"
          />
        </div>
        <div>
          <pv-calendar />
        </div>
        <div>
          <label class="text-lg font-medium mb-2 block" for="extras"
            >Extras</label
          >
          <USelectMenu
            multiple
            v-model="selected"
            id="extras"
            size="xl"
            placeholder="Select extras"
          />
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
