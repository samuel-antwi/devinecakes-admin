<script setup lang="ts">
import type { OrderType } from "@/types/order";
const router = useRouter();

const handleClick = () => {
  router.push("/admin/content/orders");
};

const props = defineProps<{
  order: OrderType;
}>();

const handleEdit = () => {
  console.log("Edit");
};
</script>
<template>
  <div class="flex items-center justify-between">
    <div v-if="order?.orderNumber">
      <h1 class="flex items-center space-x-2 text-xl text-gray-800">
        {{ order?.orderNumber }}
      </h1>
    </div>
    <div class="flex items-center space-x-2 md:space-x-3">
      <UButton
        class="bg-gray-100 hover:bg-gray-300 border text-gray-900"
        @click="handleEdit"
        label="Edit"
      />
      <UIcon
        name="i-heroicons-x-mark"
        class="cursor-pointer text-2xl"
        @click="handleClick"
      />
    </div>
  </div>
</template>
