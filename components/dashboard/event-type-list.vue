<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();

// make useFetch reactive to authStore.user.id by making it a return function
const { data, pending } = await useFetch(
  () => `/api/event-type/${authStore.user?.id}`,
  {
    lazy: true,
    // only fetch when user.id is available
    immediate: !!authStore.user?.id,
    // retrigger the fetch when the user.id changes
    watch: [() => authStore.user?.id],
  },
);
const eventTypes = reactive(data);
</script>

<template>
  <div v-if="pending || !authStore.user">
    <LoadingSpinner />
  </div>
  <template v-else-if="!eventTypes">
    <EmptyState
      title="You have no Event Types"
      icon="i-lucide-ban"
      description="Create your first event type by clicking the button below."
      button-text="Add event type"
      href="/dashboard/add-event-type"
    />
  </template>
  <div v-else>
    <h1>Hello</h1>
  </div>
</template>
