<script setup lang="ts">
import type { OrderType } from "@/types/order";
import Calendar from "primevue/calendar";
import { useStorage } from "@vueuse/core";
import ProgressSpinner from "primevue/progressspinner";

const items = [
  [
    {
      label: "Today",
      click: () => updateSelectedFilter("today"),
    },
  ],
  [
    {
      label: "Yesterday",
      click: () => updateSelectedFilter("yesterday"),
    },
  ],
  [
    {
      label: "This Week",
      click: () => updateSelectedFilter("week"),
    },
  ],
  [
    {
      label: "This Month",
      click: () => updateSelectedFilter("month"),
    },
  ],
  [
    {
      label: "This Year",
      click: () => updateSelectedFilter("year"),
    },
  ],
  [
    {
      label: "Custom Date",
      click: () => updateSelectedFilter("custom"),
    },
  ],
];
const myInputStyle = ref({
  input:
    "relative disabled:cursor-not-allowed disabled:opacity-75 md:w-[200px] w-[120px] focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
});
const orders = ref<OrderType[]>([]);
const totalSales = ref(0);
const selectedFilter = useStorage("selectedFilter", "today");
const customDate = ref("");
const filterLabel = computed(() => {
  if (selectedFilter.value === "today") return "Today";
  if (selectedFilter.value === "yesterday") return "Yesterday";
  if (selectedFilter.value === "week") return "This Week";
  if (selectedFilter.value === "month") return "This Month";
  if (selectedFilter.value === "year") return "This Year";
  if (selectedFilter.value === "custom") return "Custom Date";
});

try {
  const { data } = await useFetch("/api/orders/orders");
  orders.value = data.value as OrderType[];
  calculateTotalSales();
} catch (error) {
  console.error("Error fetching orders:", error);
}

function updateSelectedFilter(filter: string) {
  selectedFilter.value = filter;
}

watch(selectedFilter, calculateTotalSales);
watch(customDate, calculateTotalSales);

function calculateTotalSales() {
  let filteredOrders: OrderType[] = [];

  if (selectedFilter.value === "today") {
    const today = new Date();
    filteredOrders = orders.value.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.toDateString() === today.toDateString();
    });
  } else if (selectedFilter.value === "yesterday") {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    filteredOrders = orders.value.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.toDateString() === yesterday.toDateString();
    });
  } else if (selectedFilter.value === "week") {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    filteredOrders = orders.value.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startOfWeek;
    });
  } else if (selectedFilter.value === "month") {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    filteredOrders = orders.value.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startOfMonth;
    });
  } else if (selectedFilter.value === "year") {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    filteredOrders = orders.value.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startOfYear;
    });
  } else if (selectedFilter.value === "custom" && customDate.value) {
    const selectedDate = new Date(customDate.value);
    filteredOrders = orders.value.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.toDateString() === selectedDate.toDateString();
    });
  }

  totalSales.value = filteredOrders.reduce(
    (total, order) => total + (order.total ?? 0),
    0
  );
}

function formatCurrency(amount: number) {
  return (
    "GHS" +
    amount.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="font-semibold text-lg">Sales</h1>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <div class="flex items-center">
          <ClientOnly>
            <template #default>
              <h1 class="mr-1 text-sm text-gray-700">{{ filterLabel }}</h1>
            </template>
            <template #placeholder>
              <h1 class="mr-1 text-sm text-gray-700"></h1>
            </template>
          </ClientOnly>
          <UIcon class="text-xl" name="i-mdi-chevron-down" />
        </div>
      </UDropdown>
    </div>
    <div class="mt-3">
      <Calendar
        :pt="myInputStyle"
        v-if="selectedFilter === 'custom'"
        dateFormat="dd M yy"
        v-model="customDate"
        placeholder="Select a date"
      />
    </div>
    <ClientOnly>
      <template #default>
        <div class="mt-3">
          <h2 class="font-semibold text-2xl">
            {{ formatCurrency(totalSales) }}
          </h2>
        </div>
      </template>
      <template #placeholder>
        <div>
          <p>Loading...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
