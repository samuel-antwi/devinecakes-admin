<script setup lang="ts">
import CustomerDropDown from "@/components/Customers/CustomerDropDown.vue";
import type { CustomerType } from "@/types/customers";
const router = useRouter();

const handleClick = () => {
  router.push("/admin/content/customers");
};

const props = defineProps<{
  customer: CustomerType;
}>();
</script>
<template>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="flex items-center space-x-2 text-2xl text-gray-800">
        <span v-if="customer.salutation">{{ customer.salutation }}.</span>
        <span>{{ customer.firstName }}</span>
        <span>{{ customer.surname }}</span>
      </h1>
    </div>
    <div class="flex items-center space-x-2 md:space-x-3">
      <NuxtLink :to="`/admin/content/orders/create?customer-id=${customer.id}`">
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
      </NuxtLink>
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
