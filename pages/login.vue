<script setup lang="ts">
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
  <UContainer>
    <div class="flex items-center justify-center h-screen">
      <form @click.prevent="handleLogin" class="max-w-sm mx-auto w-full">
        <div
          class="header bg-gray-800 py-2 px-5 shadow-md text-gray-50 rounded-t-md"
        >
          <div class="flex items-center">
            <UIcon class="mr-2" name="i-heroicons-cake" />
            Devine Cakesgh
          </div>
        </div>
        <UCard class="rounded-tr-none rounded-tl-none">
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
        </UCard>
      </form>
    </div>
  </UContainer>
</template>
