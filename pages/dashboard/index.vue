<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
});
</script>

<template>
  <EmptyState
    icon="i-lucide-user-round-x"
    title="Your tribe is empty"
    description="Start building your personal board by adding advisors who can help you achieve your goals."
    button-text="Discover Advisors"
    href="/browse"
  />
</template>
