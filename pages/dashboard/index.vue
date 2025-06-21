<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
});
</script>

<template>
  <EmptyState
    icon="i-lucide-user-round-x"
    title="You have no clients"
    description="Build your client list with booked meetings."
    button-text="Manage meeting types"
    button-icon="lucide:square-menu"
    href="/dashboard/meeting-types"
  />
</template>
