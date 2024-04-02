<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Chart } from "highcharts-vue";
import type { OrderType } from "@/types/order";
import { format, sub } from "date-fns";

// Define the props for the component
const props = defineProps<{
  orders: OrderType[];
}>();

const chartType = ref("column");

// Create a reactive variable for chart options
const chartOptions = ref({
  chart: {
    type: chartType.value,
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
      colorByPoint: true,
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
      .filter((order) => {
        // Parse the order date to a Date object and format it to 'yyyy-MM-dd'
        const orderDate = format(new Date(order.orderDate), "yyyy-MM-dd");
        return orderDate === formattedDate;
      })
      .reduce((total, order) => total + (order.total ?? 0), 0);
    return salesAmount;
  });

  const colors = [
    "#7CB5EC",
    "#434348",
    "#90ED7D",
    "#F7A35C",
    "#8085E9",
    "#F15C80",
    "#E4D354",
  ];

  chartOptions.value.xAxis.categories = pastSevenDays;
  chartOptions.value.colors = colors;
  chartOptions.value.series[0].data = salesData.map((amount) => ({
    y: amount,
    dataLabels: {
      enabled: true,
      format: "{point.y:,.0f}",
    },
  }));
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
