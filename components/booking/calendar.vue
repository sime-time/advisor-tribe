<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { DayAvailability } from "~/db/queries/types";
import { getLocalTimeZone, toCalendarDate, today } from "@internationalized/date";
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
} from "reka-ui";

const props = defineProps<{
  date: DateValue;
  availability: DayAvailability[];
}>();

// Tell Vue what events this component can "emit" (send out).
// Here, we say we can send an 'dateSelected' event,
// and it will come with a 'DateValue'.
const emit = defineEmits<{
  (e: "dateSelected", date: DateValue): void;
}>();

const localeContext = useLocale();
const locale = localeContext.locale.value.code;
const timeZone = getLocalTimeZone();
const todayDate: DateValue = toCalendarDate(today(timeZone));

// pass this function to Calendar Root to check each and every date
function isDateUnavailable(date: DateValue) {
  // turn the current date into an week index 0-6
  const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
  // check if the current day of week is active according to availability data
  return !props.availability[dayOfWeek].isActive;
}

// function that sends the date (emits the event) to the parent component
function selectDate(date: DateValue | undefined) {
  if (date) {
    emit("dateSelected", date);
  }
};
</script>

<template>
  <!-- The main container, manages state and provides data via v-slot -->
  <CalendarRoot
    v-slot="{ weekDays, grid }"
    :model-value="date"
    weekday-format="short"
    :locale="locale"
    :min-value="todayDate"
    :is-date-unavailable="isDateUnavailable"
    class="inline-block w-fit py-8 md:py-4"
    @update:model-value="selectDate"
  >
    <!-- Header section -->
    <CalendarHeader class="flex justify-between mb-4">
      <CalendarHeading class="font-semibold text-lg" />
      <div class="flex gap-2">
        <CalendarPrev class="cursor-pointer border border-accented rounded-md flex items-center justify-center p-1.25 hover:bg-accented">
          <UIcon name="i-lucide-chevron-left" color="neutral" class="size-5" />
        </CalendarPrev>
        <CalendarNext class="cursor-pointer border border-accented rounded-md flex items-center justify-center p-1.25 hover:bg-accented">
          <UIcon name="i-lucide-chevron-right" color="neutral" class="size-5" />
        </CalendarNext>
      </div>
    </CalendarHeader>

    <!-- Loop through each month provided by CalendarRoot's grid -->
    <CalendarGrid v-for="month in grid" :key="month.value.toString()" class="w-full text-xs md:text-base">
      <CalendarGridHead>
        <CalendarGridRow class="text-sm text-neutral-500 font-medium">
          <!-- Loop through weekday names provided by CalendarRoot -->
          <CalendarHeadCell v-for="day in weekDays" :key="day">
            {{ day }}
          </CalendarHeadCell>
        </CalendarGridRow>
      </CalendarGridHead>

      <CalendarGridBody>
        <!-- Loop through each week in the current month -->
        <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`week-${index}`">
          <!-- Loop through each day in the current week -->
          <CalendarCell
            v-for="weekDate in weekDates"
            :key="weekDate.toString()"
            :date="weekDate"
          >
            <!-- The clickable part of the cell -->
            <CalendarCellTrigger
              v-slot="cellProps"
              :day="weekDate"
              :month="month.value"
            >
              <div
                class="relative rounded-md flex items-center justify-center font-medium py-3.5 px-4 bg-primary-100 m-0.5"
                :class="[
                  cellProps.disabled || cellProps.unavailable ? 'text-neutral-400 line-through bg-transparent cursor-not-allowed' : 'cursor-pointer',
                  cellProps.selected ? 'bg-primary-500 text-neutral-50 hover:bg-primary-500' : '',
                  cellProps.outsideView ? 'hidden' : '',
                ]"
              >
                {{ cellProps.dayValue }}
                <UIcon
                  v-if="cellProps.today"
                  name="i-lucide-dot"
                  class="absolute -bottom-2 size-8"
                  :class="cellProps.selected ? 'text-neutral-50' : 'text-primary'
                  "
                />
              </div>
            </CalendarCellTrigger>
          </CalendarCell>
        </CalendarGridRow>
      </CalendarGridBody>
    </CalendarGrid>
  </CalendarRoot>
</template>
