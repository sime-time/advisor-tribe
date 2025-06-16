<script setup lang="ts">
import { ref } from "vue";

// Dummy data for meetings
const meetings = ref([
  {
    id: 1,
    title: "Discovery Call",
    date: "June 5, 2025",
    time: "10:00 AM - 11:00 AM",
    attendee: "John Doe",
    status: "scheduled", // or 'completed', 'cancelled'
  },
  {
    id: 2,
    title: "Follow-up Meeting",
    date: "June 7, 2025",
    time: "2:00 PM - 2:30 PM",
    attendee: "Jane Smith",
    status: "completed",
  },
  {
    id: 3,
    title: "Project Kickoff",
    date: "June 10, 2025",
    time: "9:30 AM - 10:00 AM",
    attendee: "Peter Jones",
    status: "cancelled",
  },
]);

// Function to get badge color based on status
function getStatusColor(status: string) {
  switch (status) {
    case "scheduled":
      return "primary";
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "neutral";
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <header class="flex flex-col">
        <h1 class="text-3xl font-bold">
          Upcoming Meetings
        </h1>
        <p class="mt-1 text-base text-neutral-500">
          View and manage your scheduled meetings.
        </p>
      </header>
    </template>

    <div v-if="meetings.length > 0" class="space-y-4">
      <div
        v-for="meeting in meetings"
        :key="meeting.id"
        class="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-200 rounded-md"
      >
        <div class="flex-1 mb-2 md:mb-0">
          <h3 class="text-lg font-semibold">
            {{ meeting.title }}
          </h3>
          <p class="text-sm text-gray-600">
            <UIcon name="i-lucide-calendar" class="mr-1" />
            {{ meeting.date }}
          </p>
          <p class="text-sm text-gray-600">
            <UIcon name="i-lucide-clock" class="mr-1" />
            {{ meeting.time }}
          </p>
          <p class="text-sm text-gray-600">
            <UIcon name="i-lucide-user" class="mr-1" />
            With {{ meeting.attendee }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UBadge :color="getStatusColor(meeting.status)" variant="subtle">
            {{ meeting.status }}
          </UBadge>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      No upcoming meetings.
    </div>
  </UCard>
</template>
