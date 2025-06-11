<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { BookingData } from "~/db/queries/types";
import { getLocalTimeZone, parseDate, toCalendarDate, today } from "@internationalized/date";
import BookingCalendar from "~/components/booking/calendar.vue";

const route = useRoute();
const router = useRouter();

const { data, pending } = await useFetch<BookingData>("/api/event-type/booking-data", {
  method: "POST",
  body: {
    userLink: route.params.userLink,
    eventSlug: route.params.eventSlug,
  },
});

// get the date from the query params
const date = computed(() => {
  const dateParam = route.query.date?.toString();
  if (dateParam) {
    return parseDate(dateParam);
  }
  else {
    // return today's date
    return toCalendarDate(today(getLocalTimeZone()));
  }
});

const formattedDate = computed(() => {
  const computedDate = date.value.toDate(getLocalTimeZone());
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(computedDate);
});

// function in the parent to handle the date selected from BookingCalendar
async function handleDateSelected(selectedDate: DateValue) {
  // update the url query when date changes
  // so that the computed date variable will be up to date
  await router.replace({ path: route.path, query: { ...route.query, date: selectedDate.toString() } });
}
</script>

<template>
  <div class="min-h-screen w-screen flex items-center justify-center">
    <UCard class="max-w-screen md:max-w-[1000px] mx-auto">
      <div v-if="pending || !data">
        <LoadingSpinner />
      </div>
      <div v-else class="md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 max max-w-[95vw]">
        <div>
          <NuxtImg
            :src="data.userImage || ''"
            alt="user profile image"
            class="size-10 rounded-full"
          />
          <p class="text-sm font-medium text-neutral-500 mt-1">
            {{ data.userName }}
          </p>
          <h1 class="text-xl font-semibold mt-2">
            {{ data.title }}
          </h1>
          <p class="text-sm font-medium text-neutral-500">
            {{ data.description }}
          </p>

          <div class="mt-5 flex flex-col gap-y-3">
            <p class="flex items-center">
              <UIcon name="lucide:calendar-check-2" class="size-4 mr-2 text-primary" />
              <span class="text-sm font-medium text-neutral-500">{{ formattedDate }}</span>
            </p>
            <p class="flex items-center">
              <UIcon name="lucide:clock" class="size-4 mr-2 text-primary" />
              <span class="text-sm font-medium text-neutral-500">{{ data.duration }} Minutes</span>
            </p>
            <p class="flex items-center">
              <UIcon name="lucide:video" class="size-4 mr-2 text-primary" />
              <span class="text-sm font-medium text-neutral-500">{{ data.videoCallSoftware }}</span>
            </p>
          </div>
        </div>
        <div>
          <USeparator orientation="vertical" class="h-full" />
        </div>
        <div v-if="data?.availability">
          <BookingCalendar :date="date" :availability="data.availability" @date-selected="handleDateSelected" />
        </div>
        <div>
          <USeparator orientation="vertical" class="h-full" />
        </div>
        <div v-if="data.availability && data.grantId && data.grantEmail">
          <BookingTimeTable
            :availability="data.availability"
            :grant-id="data.grantId"
            :grant-email="data.grantEmail"
            :selected-date="date.toDate(getLocalTimeZone())"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
