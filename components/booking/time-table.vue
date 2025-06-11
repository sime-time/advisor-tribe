<script setup lang="ts">
import type { DayAvailability } from "~/db/queries/types";

interface TimeTableProps {
  selectedDate: Date;
  availability: DayAvailability[];
  grantId: string;
  grantEmail: string;
}

const props = defineProps<TimeTableProps>();

// when the date changes, update the available time options
watch(
  () => props.selectedDate,
  async (date) => {
    // send payload to api endpoint
    const result = await $fetch("/api/availability/busy-times", {
      method: "POST",
      body: {
        selectedDate: date,
        grantId: props.grantId,
        grantEmail: props.grantEmail,
      },
    });

    console.log("busy times", result);
  },
);

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(props.selectedDate);
});
</script>

<template>
  <div>
    <p class="text-base font-semibold">
      {{ formattedDate }}
    </p>
    <p>{{ props.availability[props.selectedDate.getDay()].startTime }}</p>
  </div>
</template>
