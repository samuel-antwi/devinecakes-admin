<script setup lang="ts">
import moment from "moment";
import Calendar from "primevue/calendar";
const myInputStyle = ref({
  input:
    "relative disabled:cursor-not-allowed disabled:opacity-75 md:w-[200px] w-[120px] focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
});
const props = defineProps<{
  filterLabel: string;
  items: any[];
  url: string;
}>();

// Emits
const emits = defineEmits(["clearFilters"]);

// Setup state
const router = useRouter();
const filterBy = defineModel("filterBy");
const query = defineModel("query");
const initialQuery = defineModel("initialQuery");
const selected = defineModel("selected");

onMounted(() => {
  if (filterBy.value === "date" && initialQuery.value) {
    query.value = moment(initialQuery.value, "YYYY-MM-DD").format(
      "DD MMM YYYY"
    );
  }
});

watch(
  selected,
  (newVal) => {
    if (newVal) {
      query.value = newVal.label;
    }
  },
  { deep: true }
);

watch(
  query,
  (newQuery) => {
    if (filterBy.value === "date" && newQuery) {
      const formattedForURL = moment(newQuery, "DD MMM YYYY").format(
        "YYYY-MM-DD"
      );
      router.push({
        path: props.url,
        query: { filter_by: filterBy.value, query: formattedForURL },
      });
    }
  },
  { immediate: true, deep: true }
);

function clearAllFilters() {
  filterBy.value = "";
  query.value = "";
  selected.value = "";
  router.push({
    path: props.url,
  });
}
</script>
<template>
  <div class="flex items-center md:space-x-4 space-x-2">
    <h1 class="md:text-xl text-sm font-medium">
      <span v-show="filterBy === 'all-invoices' || !filterBy">{{
        filterLabel
      }}</span>
      <span v-show="filterBy === 'date'">Date Created</span>
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
