import { useToast } from "primevue/usetoast";

interface ParamsType {
  endpoint: string;
  id: string;
  successMessage: string;
  errorMessage: string;
}

const isDeleteOpen = ref(false);
export function useDeleteAction(params: ParamsType) {
  const toast = useToast();
  const { execute } = useFetch(params?.endpoint || "", {
    method: "DELETE",
    body: { id: params.id },
    immediate: false,
    watch: false,
  });

  async function handleDelete() {
    try {
      await execute();
      toast.add({
        severity: "success",
        summary: "Success",
        detail: params.successMessage,
        life: 4000,
      });
    } catch (e) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: params.errorMessage,
        life: 4000,
      });
    }
  }

  return { handleDelete, isDeleteOpen };
}
