<script setup lang="ts">
const router = useRouter();
const supabase = useSupabaseClient();

const logout = async () => {
  await supabase.auth.signOut();
  await router.push("/login");
};
</script>

<template>
  <div>
    <UButton @click="logout" color="primary">Log out</UButton>
  </div>
</template>
