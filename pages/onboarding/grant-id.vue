<script setup lang="ts">
async function connectCalendar() {
  // Trigger a window location change to the API endpoint
  window.location.href = "/api/oauth/grant-nylas";
}
</script>

<template>
  <div class="h-screen max-w-screen flex justify-center items-start px-1">
    <UCard class="mt-20">
      <template #header>
        <h1 class="text-3xl font-bold">
          You are almost done!
        </h1>
        <p class="text-neutral-500 text-base">
          We have to connect your calendar to your account.
        </p>
      </template>

      <UButton
        size="xl"
        block
        icon="i-lucide-calendar-check"
        @click="connectCalendar"
      >
        Connect Calendar to Your Account
      </UButton>
    </UCard>
  </div>
</template>
