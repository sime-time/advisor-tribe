<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "~/stores/auth-store";

definePageMeta({
  layout: "dashboard-layout",
});

const authStore = useAuthStore();

const { data: meetings, isPending } = useQuery({
  queryKey: ["meetings", authStore.user?.grantId],
  queryFn: async () => {
    const response = await $fetch("/api/meeting/list", {
      method: "POST",
      body: {
        grantId: authStore.user?.grantId,
        grantEmail: authStore.user?.grantEmail,
      },
    });
    return response.data;
  },
  // only execute query when user exists
  enabled: !!authStore.user,
});
</script>

<template>
  <main>
    <div v-if="isPending">
      <LoadingSpinner />
    </div>
    <div v-else>
      <p>{{ meetings }}</p>
    </div>
  </main>
</template>
