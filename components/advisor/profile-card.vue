<script setup lang="ts">
import type { AdvisorUser } from "~/db/queries/types";

defineProps<{
  advisor: AdvisorUser;
}>();

const showFullBio = ref(false);
</script>

<template>
  <UCard class="h-fit">
    <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <NuxtImg
        :src="advisor.image || ''"
        alt="advisor profile image"
        width="300"
        class="rounded-xl"
      />

      <div class="container flex-4 flex flex-col gap-5 ">
        <UBadge color="primary" variant="soft" class="w-fit" size="xl">
          {{ advisor.title }}
        </UBadge>
        <div>
          <h1 class="text-3xl font-bold">
            {{ advisor.name }}
          </h1>
          <p class="text-neutral-600/90 flex items-center gap-1">
            <UIcon name="lucide:map-pin" />
            {{ `${advisor.city}, ${advisor.state}` }}
          </p>
        </div>
        <div class="flex flex-row gap-2 flex-wrap">
          <div v-for="category in advisor.categories" :key="category.id">
            <UBadge color="neutral" variant="soft" size="lg" class="rounded-full font-semibold">
              {{ category.categoryName }}
            </UBadge>
          </div>
        </div>
        <p :class="{ 'line-clamp-5': !showFullBio }">
          {{ advisor.bio }}
        </p>
        <UButton
          v-if="advisor.bio.length > 250"
          variant="ghost"
          color="primary"
          class="w-fit"
          @click="showFullBio = !showFullBio"
        >
          {{ showFullBio ? 'Read Less' : 'Read More' }}
        </UButton>
      </div>
    </div>
  </UCard>
</template>
