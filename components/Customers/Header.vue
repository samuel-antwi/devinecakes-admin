<script setup lang="ts">
import CustomerDropDown from "@/components/Customers/CustomerDropDown.vue";
const router = useRouter();

const handleClick = () => {
  router.push("/admin/content/customers");
};
</script>
<template>
  <div class="flex items-center justify-between">
    <div>
      <h1>Ms. Jennifer Gyabaah</h1>
    </div>
    <div class="flex items-center space-x-2 md:space-x-3">
      <UTooltip
        text="Place new order for Ms. Jennifer Gyabaah"
        :popper="{ arrow: true }"
      >
        <button
          class="bg-primary flex items-center justify-center hover:bg-primay-700 text-white px-3 py-1 rounded-md"
        >
          <UIcon name="i-heroicons-plus" class="text-xl md:hidden" />
          <span class="hidden md:block">New order</span>
        </button>
      </UTooltip>
      <customer-drop-down />
      <button @click="handleClick">
        <UIcon
          name="i-heroicons-x-mark"
          class="text-gray-600 hover:text-gray-800 text-2xl"
        />
      </button>
    </div>
  </div>
</template>
