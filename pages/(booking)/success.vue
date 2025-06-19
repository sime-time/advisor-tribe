<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <main class="h-screen w-screen flex items-center justify-center">
    <UCard class="w-[400px] mx-auto ">
      <div class="flex flex-col items-center">
        <div class="size-16 bg-green-500/10 rounded-full flex items-center justify-center">
          <UIcon name="i-lucide-check" class="size-8 text-success" />
        </div>
        <h1 class="text-2xl font-semibold mt-4">
          This meeting is scheduled
        </h1>
        <p class="text-sm text-neutral-500 text-center mt-2">
          We've emailed you a calendar invitation with all the details and a video call link!
        </p>
      </div>
      <template #footer>
        <UButton to="/dashboard" size="xl" block>
          Close this page
        </UButton>
      </template>
    </UCard>
  </main>
</template>
