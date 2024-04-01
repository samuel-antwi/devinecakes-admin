<script setup lang="ts">
import type { OrderType } from "@/types/order";
import Calendar from "primevue/calendar";
import { useStorage } from "@vueuse/core";
import {
  startOfToday,
  startOfYesterday,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfWeek,
  endOfMonth,
  endOfYear,
  parseISO,
  isSameDay,
  isWithinInterval,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns";

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
      label: "Previous Week",
      click: () => updateSelectedFilter("lastWeek"),
    },
  ],
  [
    {
      label: "Previous Month",
      click: () => updateSelectedFilter("lastMonth"),
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
    "relative disabled:cursor-not-allowed disabled:opacity-75 w-[120px] focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
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
  if (selectedFilter.value === "lastWeek") return "Previous Week";
  if (selectedFilter.value === "lastMonth") return "Previous Month";
  if (selectedFilter.value === "lastYear") return "Previous Year";
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
  let filteredOrders = [];

  const today = startOfToday();
  const yesterday = startOfYesterday();
  const thisWeekStart = startOfWeek(new Date());
  const thisMonthStart = startOfMonth(new Date());
  const thisYearStart = startOfYear(new Date());

  // Calculate the start and end of the previous week, month, and year
  const lastWeekStart = startOfWeek(subWeeks(new Date(), 1));
  const lastWeekEnd = endOfWeek(subWeeks(new Date(), 1));
  const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
  const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));
  const lastYearStart = startOfYear(subYears(new Date(), 1));
  const lastYearEnd = endOfYear(subYears(new Date(), 1));

  filteredOrders = orders.value.filter((order) => {
    const orderDate = parseISO(order.createdAt);

    switch (selectedFilter.value) {
      case "today":
        return isSameDay(orderDate, today);
      case "yesterday":
        return isSameDay(orderDate, yesterday);
      case "week":
        return isWithinInterval(orderDate, {
          start: thisWeekStart,
          end: new Date(),
        });
      case "month":
        return isWithinInterval(orderDate, {
          start: thisMonthStart,
          end: new Date(),
        });
      case "year":
        return isWithinInterval(orderDate, {
          start: thisYearStart,
          end: new Date(),
        });
      case "lastWeek":
        return isWithinInterval(orderDate, {
          start: lastWeekStart,
          end: lastWeekEnd,
        });
      case "lastMonth":
        return isWithinInterval(orderDate, {
          start: lastMonthStart,
          end: lastMonthEnd,
        });
      case "lastYear":
        return isWithinInterval(orderDate, {
          start: lastYearStart,
          end: lastYearEnd,
        });
      case "custom":
        if (customDate.value) {
          const selectedCustomDate = new Date(customDate.value);
          return isSameDay(orderDate, selectedCustomDate);
        }
        return false;
      default:
        return false;
    }
  });

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
const router = useRouter();
function createNewOrder() {
  router.push("/admin/content/orders/create");
}
</script>

<template>
  <div class="mb-10 gap-5 md:grid grid-cols-5">
    <UCard class="col-span-3 mb-3 md:mb-0">
      <h1 class="font-semibold mb-3">Sales Metrics</h1>
      <p class="mb-3">
        View all your metrics here and see the sales you have made over certain
        period of time.
      </p>
      <UButton @click="createNewOrder" label=" Create New Order" />
    </UCard>
    <UCard class="col-span-2">
      <client-only>
        <template #default>
          <div class="flex items-center justify-between">
            <h1 class="font-semibold text-lg">Sales</h1>
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
              <div class="flex items-center">
                <h1 class="mr-1 text-sm text-gray-700">{{ filterLabel }}</h1>
                <UIcon class="text-xl" name="i-mdi-chevron-down" />
              </div>
            </UDropdown>
          </div>
          <div class="mt-2 flex justify-end">
            <Calendar
              :pt="myInputStyle"
              v-if="selectedFilter === 'custom'"
              dateFormat="dd M yy"
              v-model="customDate"
              placeholder="Select a date"
            />
          </div>
          <div class="mt-3">
            <h2 class="font-semibold text-primary md:text-3xl text-2xl">
              {{ formatCurrency(totalSales) }}
            </h2>
          </div>
        </template>
        <template #placeholder>
          <h2>Loading...</h2>
        </template>
      </client-only>
    </UCard>
  </div>
</template>
