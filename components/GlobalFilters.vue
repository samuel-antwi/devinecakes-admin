<script setup lang="ts">
import moment from "moment";
import Calendar from "primevue/calendar";
const myInputStyle = ref({
  input:
    "relative disabled:cursor-not-allowed disabled:opacity-75 md:w-[200px] w-[120px] focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
});
const props = defineProps<{
  items: any[];
  url: string;
  label: string;
}>();

// Emits
const emits = defineEmits(["clearFilters"]);

// Setup state
const router = useRouter();
const filterBy = defineModel("filterBy");
const query = defineModel("query");
const initialQuery = defineModel("initialQuery");
const selected = defineModel("selected");

const route = useRoute();
console.log("ROUTE", route.query);
console.log("INITIAL_QUERY", initialQuery.value);

watch(
  selected,
  (newVal) => {
    if (newVal) {
      query.value = newVal.label;
    }
  },
  { deep: true }
);

const getFilterLabel = computed(() => {
  if (filterBy.value === "date") {
    return "Date Ordered";
  } else if (filterBy.value === "due-today") {
    return "Due Today";
  } else if (filterBy.value === "due-tomorrow") {
    return "Due Tomorrow";
  } else {
    return `All ${props.label}`;
  }
});

watch(
  query,
  (newVal) => {
    // console.log("QUERY_BEFORE_ROUTER", newVal);
    if (filterBy.value === "date" && newVal) {
      const formattedForURL = moment(newVal, "DD MMM YYYY").format(
        "YYYY-MM-DD"
      );
      router.push({
        path: props.url,
        query: { filter_by: filterBy.value, query: formattedForURL },
      });
      // console.log("QUERY_AFTER_ROUTER", formattedForURL);
    } else if (filterBy.value === "due-today" && newVal) {
      router.push({
        path: props.url,
        query: { filter_by: filterBy.value, query: newVal },
      });
    }
  },
  { immediate: true, deep: true }
);

function clearAllFilters() {
  filterBy.value = "";
  query.value = "";
  selected.value = "";
  initialQuery.value = "";
  router.push({
    path: props.url,
  });
}
</script>
<template>
  <div class="flex items-center md:space-x-4 space-x-2">
    <h1 class="md:text-xl text-sm font-medium">
      <span>{{ getFilterLabel }}</span>
    </h1>
    <ClientOnly>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton color="white" label="Filters" icon="i-mdi-filter-variant" />
      </UDropdown>
    </ClientOnly>
    <Calendar
      :pt="myInputStyle"
      v-if="filterBy === 'date'"
      dateFormat="dd M yy"
      v-model="query"
      placeholder="Select a date"
    />
    <div>
      <UButton
        type="button"
        v-if="query"
        @click="clearAllFilters"
        label="Clear"
      />
    </div>
  </div>
</template>