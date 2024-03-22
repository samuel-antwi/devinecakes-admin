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

watch(
  selected,
  (newVal) => {
    if (newVal) {
      query.value = newVal.label;
    }
  },
  { deep: true }
);

type FilterKey = "date" | "due-date" | "due-today" | "due-tomorrow";
const labelMap: Record<FilterKey, string> = {
  date: "Date Ordered",
  "due-date": "Due Date",
  "due-today": "Due Today",
  "due-tomorrow": "Due Tomorrow",
};

const getFilterLabel = computed(() => {
  const key = filterBy.value as FilterKey;
  return labelMap[key] || `All ${props.label}`;
});

watch(
  query,
  (newVal) => {
    if (
      filterBy.value === "date" ||
      (filterBy.value === "due-date" && newVal)
    ) {
      const formattedForURL = moment(newVal, "DD MMM YYYY").format(
        "YYYY-MM-DD"
      );
      if (query.value) {
        router.push({
          path: props.url,
          query: { filter_by: filterBy.value, query: formattedForURL },
        });
      }
    } else if (
      filterBy.value === "due-today" ||
      (filterBy.value === "due-tomorrow" && newVal)
    ) {
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
      v-if="filterBy === 'date' || filterBy === 'due-date'"
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
