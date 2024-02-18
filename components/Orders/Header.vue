<script setup lang="ts">
import type { OrderType } from "@/types/order";
const router = useRouter();

const handleClick = () => {
  router.push("/admin/content/customers");
};

const props = defineProps<{
  order: OrderType;
}>();
</script>
<template>
  <div class="flex items-center justify-between">
    <div v-if="order?.orderNumber">
      <h1 class="flex items-center space-x-2 text-xl text-gray-800">
        {{ order?.orderNumber }}
      </h1>
    </div>
    <div class="flex items-center space-x-2 md:space-x-3">Hello</div>
  </div>
</template>
