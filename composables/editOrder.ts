import type { OrderType } from "@/types/order";
const state = ref({
  editOrderModal: false,
  selectedOrder: {} as OrderType,
 })
export const useEditOrder = () => {
  return {
    state
  }
};