<script setup lang="ts">
import type { BookingData } from "~/db/queries/types";
// get the url params
const route = useRoute();
const { data, pending, error } = await useFetch<BookingData>("/api/event-type/booking-data", {
  method: "POST",
  body: {
    userLink: route.params.userLink,
    eventSlug: route.params.eventSlug,
  },
});
</script>

<template>
  <div class="min-h-screen w-screen flex items-center justify-center">
    <UCard class="max-w-[1000px] w-full mx-auto">
      <div class="md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div>
          <NuxtImg
            :src="data?.userImage || ''"
            alt="user profile image"
            class="size-10 rounded-full"
          />
          <p class="text-sm font-medium text-neutral-500 mt-1">
            {{ data?.userName }}
          </p>
          <h1 class="text-xl font-semibold mt-2">
            {{ data?.title }}
          </h1>
          <p class="text-sm font-medium text-neutral-500">
            {{ data?.description }}
          </p>

          <div class="mt-5 flex flex-col gap-y-3">
            <p class="flex items-center">
              <UIcon name="lucide:calendar-x-2" class="size-4 mr-2 text-primary" />
              <span class="text-sm font-medium text-neutral-500"> 23 Sept. 2025</span>
            </p>
            <p class="flex items-center">
              <UIcon name="lucide:clock" class="size-4 mr-2 text-primary" />
              <span class="text-sm font-medium text-neutral-500">{{ data?.duration }} Minutes</span>
            </p>
            <p class="flex items-center">
              <UIcon name="lucide:video" class="size-4 mr-2 text-primary" />
              <span class="text-sm font-medium text-neutral-500">{{ data?.videoCallSoftware }}</span>
            </p>
          </div>
        </div>
        <div>
          <USeparator orientation="vertical" class="h-full" />
        </div>
        <div>
          hwllo
        </div>
        <div>
          <USeparator orientation="vertical" class="h-full" />
        </div>
      </div>
    </UCard>
  </div>
</template>
