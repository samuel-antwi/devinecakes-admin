<script setup lang="ts">
definePageMeta({
  layout: "login-layout",
});

const supabase = useSupabaseClient();
const isLoading = ref(false);
const user = useSupabaseUser();
const errorMsg = ref("");

interface User {
  email: string;
  password: string;
}

const formData = ref<User>({
  email: "",
  password: "",
});

// Login with email and password
async function login() {
  try {
    isLoading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    });
    if (user.value) navigateTo({ path: "/confirm" });
    if (error) {
      errorMsg.value =
        "Looks like either your email address or password were incorrect!";
      return;
    }
    errorMsg.value = "";
  } catch (error) {
    console.error(error);
    errorMsg.value = "An unexpected error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

const handleLogin = async () => {
  await login();
};

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/admin/content/orders");
    }
  },
  { immediate: true }
);
</script>
<template>
  <div>
    <div class="flex items-center justify-center h-screen">
      <form @submit.prevent="handleLogin" class="max-w-sm mx-auto w-full">
        <UAlert
          v-if="errorMsg"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          class="mb-4 relative"
          type="error"
          :title="errorMsg"
          color="rose"
        />
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
            <UButton type="submit" block class="rounded-full" label="Log in">
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
