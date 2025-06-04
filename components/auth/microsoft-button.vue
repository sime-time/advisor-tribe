<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();
</script>

<template>
  <UButton
    color="neutral"
    variant="outline"
    class="flex gap-2"
    size="xl"
    :loading="authStore.loading"
    :disabled="authStore.loading"
    @click="authStore.microsoftSignIn"
  >
    <UIcon name="logos:microsoft-icon" />
    Sign in with Microsoft
  </UButton>
</template>
