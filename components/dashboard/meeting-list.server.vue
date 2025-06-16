<script setup lang="ts">
import { format, fromUnixTime } from "date-fns";
import { auth } from "~/lib/auth";
import { nylas } from "~/lib/nylas";

// get user session data
const reqHeaders = useRequestHeaders();
const session = await auth.api.getSession({
  headers: new Headers(reqHeaders),
});

// get all the meetings from nylas api
const meetings = await nylas.events.list({
  identifier: session?.user.grantId as string,
  queryParams: {
    calendarId: session?.user.grantEmail as string,
  },
});
</script>

<template>
  <main class="w-full h-full">
    <div v-if="!meetings || meetings.data.length === 0" class="h-full">
      <EmptyState
        title="No meetings found"
        description="You don't have any bookings yet."
        icon="lucide:calendar-x"
        button-text="Create a new meeting type"
        href="/dashboard/add-meeting-type"
      />
    </div>
    <div v-else>
      <UCard>
        <template #header>
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold">
              Meetings
            </h1>
            <p class="mt-1 text-base text-neutral-500">
              See your upcoming booked meetings
            </p>
          </div>
        </template>
        <div v-for="(meet, index) in meetings.data" :key="index">
          <form>
            <div class="grid grid-cols-3 justify-between items-center">
              <div class="space-y-1">
                <p class="text-neutral-500 text-sm">
                  {{ format(fromUnixTime(meet.when.startTime), "EEE, dd MMM") }}
                </p>
                <p class="text-neutral-500 text-xs">
                  {{ format(fromUnixTime(meet.when.startTime), "hh:mm a") }} - {{ format(fromUnixTime(meet.when.endTime), "hh:mm a") }}
                </p>
                <div class="flex items-center gap-2">
                  <UIcon name="lucide:video" class="size-4 text-primary" />
                  <NuxtLink :href="meet.conferencing.details?.url" target="_blank" class="text-xs text-primary underline underline-offset-4">
                    Join Meeting
                  </NuxtLink>
                </div>
              </div>

              <div class="flex flex-col items-start">
                <h2 class="text-sm font-medium">
                  {{ meet.title }}
                </h2>
                <p class="text-sm text-neutral-500">
                  You and {{ meet.participants[0].name }}
                </p>
              </div>

              <div class="flex justify-end">
                <UButton type="submit" color="error" size="lg">
                  Cancel Event
                </UButton>
              </div>
            </div>
            <USeparator class="my-4" />
          </form>
        </div>
      </UCard>
    </div>
  </main>
</template>
