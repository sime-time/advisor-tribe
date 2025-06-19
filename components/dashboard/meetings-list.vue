<script setup lang="ts">
import type { Event } from "nylas";
import { format, fromUnixTime } from "date-fns";
import { ZodError } from "zod/v4";
import { DeleteMeetingSchema } from "~/validation/delete-meeting-schema";

const { data: meetings, pending, refresh } = useFetch<Event[]>("/api/meeting/list", {
  lazy: true,
});

// handle deletion
const isLoading = ref(false);
const toast = useToast();

async function handleDeleteMeeting(eventId: string, grantId: string, calendarId: string) {
  isLoading.value = true;
  try {
    // this json will be sent to the api
    const validMeeting = DeleteMeetingSchema.parse({
      eventId,
      grantId,
      calendarId,
    });

    // send payload to api endpoint
    await $fetch("/api/meeting/delete", {
      method: "POST",
      body: validMeeting,
    });

    toast.add({
      title: "Meeting deleted successfully!",
      color: "success",
    });

    // refetch the meetings list
    await refresh();
  }
  catch (err: any) {
    console.error("Meeting Deletion Error", err);
    const formError = err instanceof ZodError
      ? err.issues[0].message
      : err.message || "An error occurred";

    return toast.add({
      title: "Failed to delete meeting",
      description: formError,
      icon: "i-lucide-triangle-alert",
      color: "error",
    });
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section class="w-full h-full">
    <div v-if="pending">
      <LoadingSpinner />
    </div>
    <div v-else-if="!meetings || meetings.length === 0" class="h-full">
      <EmptyState
        title="No meetings found"
        description="You don't have any bookings yet."
        icon="lucide:calendar-x"
        button-text="Create a new meeting type"
        href="/dashboard/meeting-types/create"
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
            v-for="(meet, index) in meetings"
            :key="index"
            class="p-5 border border-accented/60 shadow-xs rounded-lg"
          >
            <form class="grid grid-cols-1 lg:grid-cols-3 gap-2 justify-between items-center" @submit.prevent="() => handleDeleteMeeting(meet.id, meet.grantId, meet.calendarId)">
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
                  <UButton type="button" icon="i-lucide-video" :href="meet.conferencing.details?.url" target="_blank" variant="subtle" class="w-1/2 justify-center" :loading="isLoading" :disabled="isLoading">
                    Join Meeting
                  </UButton>
                  <UButton type="submit" icon="i-lucide-trash-2" variant="outline" color="error" class="w-1/2 justify-center" :loading="isLoading" :disabled="isLoading">
                    Delete
                  </UButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>
