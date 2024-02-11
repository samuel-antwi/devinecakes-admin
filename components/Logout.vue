<script setup lang="ts">
const router = useRouter();
const { logout } = useDirectusAuth();
const onSubmit = async () => {
  logout();
  router.push("/login");
};
</script>

<template>
  <div>
    <UButton @click="onSubmit" color="primary">Log out</UButton>
  </div>
</template>
