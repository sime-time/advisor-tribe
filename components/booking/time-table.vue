<script setup lang="ts">
import type { FreeBusyTimeSlot } from "nylas";
import type { DayAvailability } from "~/db/queries/types";
import { format } from "date-fns";
import { calculateAvailableTimeSlots, militaryToStandardTime } from "~/lib/time";

interface TimeTableProps {
  selectedDate: Date;
  availability: DayAvailability[];
  duration: number;
  grantId: string;
  grantEmail: string;
}

const props = defineProps<TimeTableProps>();

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(props.selectedDate);
});

async function getAvailableTimeSlots(date: Date) {
  // send payload to api endpoint
  const busyTimes: FreeBusyTimeSlot[] = await $fetch("/api/availability/busy-times", {
    method: "POST",
    body: {
      selectedDate: date,
      grantId: props.grantId,
      grantEmail: props.grantEmail,
    },
  }) satisfies FreeBusyTimeSlot[];

  // get today's availablility, using today's weekday index
  const weekdayIndex = props.selectedDate.getDay();
  const dateAvailability = props.availability[weekdayIndex] as DayAvailability;

  return calculateAvailableTimeSlots(props.selectedDate, dateAvailability, busyTimes, props.duration);
}

// when the date changes, update the available time slot options
const availableSlots = ref(await getAvailableTimeSlots(props.selectedDate));
watch(
  () => props.selectedDate,
  async (date) => {
    availableSlots.value = await getAvailableTimeSlots(date);
  },
);
</script>

<template>
  <div>
    <p class="text-base font-semibold">
      {{ formattedDate }}
    </p>
    <div v-if="!availableSlots">
      <LoadingSpinner />
    </div>
    <div v-else-if="availableSlots.length === 0">
      <p class="mt-2 text-lg text-error ">
        No time slots available. Select another date.
      </p>
    </div>
    <div v-else class="grid grid-cols-2 lg:grid-cols-1 gap-3 mt-3 max-h-[350px] overflow-y-auto p-1">
      <div
        v-for="(slot, index) in availableSlots"
        :key="index"
      >
        <!-- add a time query param to url when slot is clicked -->
        <UButton :to="`?date=${format(props.selectedDate, 'yyyy-MM-dd')}&time=${slot}`" block size="xl" variant="outline">
          {{ militaryToStandardTime(slot) }}
        </UButton>
      </div>
    </div>
  </div>
</template>
