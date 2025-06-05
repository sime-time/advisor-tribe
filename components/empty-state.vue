<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  description: string;
  buttonText: string;
  href: string;
}>();
</script>

<template>
  <div class="flex flex-col flex-1 h-full items-center justify-center rounded-lg border-2 border-dashed border-accented bg-elevated/60 p-8 text-center animate-in fade-in-50">
    <div class="flex items-center justify-center size-20 rounded-full bg-primary/10">
      <UIcon :name="icon" class="text-primary size-10" />
    </div>

    <h2 class="mt-6 text-xl font-semibold">
      {{ title }}
    </h2>
    <p class="mb-6 mt-2 text-sm text-neutral-500 max-w-sm mx-auto">
      {{ description }}
    </p>
    <UButton :to="href" icon="i-lucide-plus-circle" size="lg">
      {{ buttonText }}
    </UButton>
  </div>
</template>
