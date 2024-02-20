<script setup lang="ts">
import type { OrderType } from "@/types/order";
const props = defineProps<{
  order: OrderType;
}>();

const orderTotal = (quantity: number, amount: number) => {
  return quantity * amount;
};
</script>

<template>
  <div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  ITEM
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  ORDERED
                </th>

                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  STATUS
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  RATE
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  AMOUNT
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="odd:bg-gray-50">
                <td
                  class="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                >
                  {{ order.cakeType || "Cake" }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ order.quantity }}
                </td>
                <td
                  class="whitespace-nowrap capitalize px-3 py-4 text-sm text-gray-500"
                >
                  {{ order.orderStatus }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  GHS{{ order.amount }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  GHS{{ orderTotal(order.amount, order.quantity) }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt-10 flex justify-end items-end">
            <div class="w-[300px]">
              <div
                class="flex font-semibold text-lg items-center justify-between"
              >
                <h1>Sub Total</h1>
                <h1 class="font-medium text-gray-800">
                  GHS{{ orderTotal(order.amount, order.quantity) }}
                </h1>
              </div>
              <p class="text-sm text-gray-700">
                Total Quantity: <span>{{ order.quantity }}</span>
              </p>
              <div class="py-3">
                <UDivider />
              </div>
              <div>
                <div
                  class="flex font-semibold text-lg items-center justify-between"
                >
                  <h1>Total</h1>
                  <h1 class="font-medium text-gray-800">
                    GHS{{ orderTotal(order.amount, order.quantity) }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
