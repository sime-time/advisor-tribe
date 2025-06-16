<script setup lang="ts">
import type { Event } from "nylas";
import { useAuthStore } from "~/stores/auth-store";

definePageMeta({
  layout: "dashboard-layout",
});

const authStore = useAuthStore();

const { data: meetings, pending, error } = useFetch<Event[]>("/api/meeting/list", {
  method: "POST",
  body: {
    grantId: authStore.user?.grantId,
    grantEmail: authStore.user?.grantEmail,
  },
  // only fetch when user exists
  immediate: !!authStore.user,
  // retrigger the fetch when the user changes
  // sometimes the user doesn't immediately load, so it changes from null to user
  watch: [() => authStore.user],
  // unique key based on user's grantId
  key: `meetings-${authStore.user?.grantId}`,
  lazy: true,
});
</script>

<template>
  <div v-if="pending ">
    <LoadingSpinner />
  </div>
  <div v-else-if="error || !meetings">
    <EmptyState
      title="Error"
      description="Internal server error"
      icon="i-lucide-triangle-alert"
      button-text="Try again"
      href="/dashboard/meetings"
    />
  </div>
  <div v-else-if="meetings.length < 1" class="h-full">
    <EmptyState
      title="No meetings found"
      description="You don't have any meetings yet."
      icon="lucide:calendar-x"
      button-text="Set up a meeting type"
      href="/dashboard/meeting-types"
    />
  </div>
  <div v-else>
    <UCard>
      <template #header>
        <header class="flex flex-col">
          <h1 class="text-3xl font-bold">
            Meetings
          </h1>
          <p class="mt-1 text-base text-neutral-500">
            See your upcoming booked meetings
          </p>
        </header>
      </template>
      <div v-for="(meet, index) in meetings" :key="index">
        <p>meeting</p>
      </div>
    </UCard>
  </div>
</template>
