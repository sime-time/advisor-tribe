<script setup lang="ts">
import { format, fromUnixTime } from "date-fns";
import { auth } from "~/lib/auth";
import { nylas } from "~/lib/nylas";

definePageMeta({
  layout: "dashboard-layout",
});

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
              See your upcoming booked meetings.
            </p>
          </div>
        </template>
        <div class="flex flex-col gap-5">
          <div
            v-for="(meet, index) in meetings.data"
            :key="index"
            class="p-5 border border-accented/60 shadow-xs rounded-lg"
          >
            <form class="grid grid-cols-1 lg:grid-cols-3 gap-2 justify-between items-center">
              <div class="flex flex-col items-start gap-1">
                <h3 class="text-lg font-semibold">
                  {{ meet.title }}
                </h3>

                <p class="flex items-center gap-2 text-neutral-500 text-sm">
                  <UIcon name="i-lucide-user-round" />
                  <span>with {{ meet.participants[0].name }}</span>
                </p>
              </div>

              <div class="flex flex-col items-start text-neutral-500 text-sm gap-2">
                <p class="flex items-center gap-2">
                  <UIcon name="i-lucide-calendar" />
                  <span>{{ format(fromUnixTime(meet.when.startTime), "EEEE, MMM dd") }}</span>
                </p>
                <p class="flex items-center gap-2">
                  <UIcon name="i-lucide-clock" />
                  {{ format(fromUnixTime(meet.when.startTime), "hh:mm a") }} - {{ format(fromUnixTime(meet.when.endTime), "hh:mm a") }}
                </p>
              </div>

              <div class="flex justify-start lg:justify-end mt-1 lg:mt-0">
                <div class="flex flex-row lg:flex-col gap-2 justify-between items-end w-full">
                  <UButton type="button" icon="i-lucide-video" :href="meet.conferencing.details?.url" target="_blank" variant="subtle" class="w-1/2 justify-center">
                    Join Meeting
                  </UButton>
                  <UButton type="button" icon="i-lucide-trash-2" variant="outline" color="error" class="w-1/2 justify-center">
                    Delete
                  </UButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </UCard>
    </div>
  </main>
</template>
