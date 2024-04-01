<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Chart } from "highcharts-vue";
import type { OrderType } from "@/types/order";
import { format, sub } from "date-fns";

// Define the props for the component
const props = defineProps<{
  orders: OrderType[];
}>();

// Create a reactive variable for chart options
const chartOptions = ref({
  chart: {
    type: "column",
  },
  title: {
    text: "Sales metrics for the Past 7 Days",
  },
  xAxis: {
    categories: [] as string[],
  },
  yAxis: {
    title: {
      text: "Sales Amount",
    },
  },
  series: [
    {
      name: "Sales",
      data: [] as number[],
    },
  ],
});

const processData = () => {
  const today = new Date();
  const pastSevenDays = [...Array(7)]
    .map((_, i) => {
      const date = sub(today, { days: i });
      return format(date, "dd MMM yyyy");
    })
    .reverse();

  const salesData = pastSevenDays.map((date) => {
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    const salesAmount = props.orders
      .filter((order) => order.orderDate.slice(0, 10) === formattedDate)
      .reduce((total, order) => total + (order.total ?? 0), 0);
    return salesAmount;
  });

  chartOptions.value.xAxis.categories = pastSevenDays;
  chartOptions.value.series[0].data = salesData;
};

// Process the data when the component is mounted
onMounted(() => {
  processData();
});
</script>

<template>
  <ClientOnly>
    <Chart :options="chartOptions" />
  </ClientOnly>
</template>
