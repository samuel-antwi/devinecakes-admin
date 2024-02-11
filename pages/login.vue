<script setup lang="ts">
definePageMeta({
  layout: "login-layout",
});

const formData = ref({
  email: "",
  password: "",
});

const { login } = useDirectusAuth();
const router = useRouter();
const onSubmit = async () => {
  try {
    await login({ email: "", password: "" });
    router.push("/admin/content/orders");
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div>
    <div class="flex items-center justify-center h-screen">
      <form @click.prevent="onSubmit" class="max-w-sm mx-auto w-full">
        <div
          class="header border border-b-0 border-gray-700 bg-indigo-800 py-2 px-5 shadow-md text-gray-50 rounded-t-md"
        >
          <div class="flex items-center">
            <UIcon class="mr-2" name="i-heroicons-cake" />
            Devine Cakesgh
          </div>
        </div>
        <div
          class="rounded-tr-none p-10 border border-gray-300 dark:border-gray-600 rounded-tl-none"
        >
          <div class="mb-4">
            <label class="mb-1" for="email">Email address</label>
            <UInput
              id="email"
              size="sm"
              v-model="formData.email"
              type="email"
            />
          </div>
          <div>
            <label class="mb-1" for="password">Password</label>
            <UInput
              id="password"
              size="sm"
              v-model="formData.password"
              type="password"
            />
          </div>
          <div class="mt-5">
            <UButton block class="rounded-full" label="Log in">
              <template #trailing>
                <UIcon name="i-heroicons-lock-closed" />
              </template>
            </UButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
