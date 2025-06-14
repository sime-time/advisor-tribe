import type { FreeBusyTimeSlot } from "nylas";
import type { DayAvailability } from "~/db/queries/types";
import { addMinutes, format, fromUnixTime, isAfter, isBefore, parse } from "date-fns";

export enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

// helper function to get the readable day name from the numeric enum value
export function getDayName(weekDay: number): string {
  return Day[weekDay];
}

// format a time number to time string
// i.e. 1700 to 17:00
export function formatTime(timeNumber: number): string {
  const timeString = timeNumber.toString().padStart(4, "0");
  const hours = timeString.substring(0, 2);
  const minutes = timeString.substring(2, 4);
  return `${hours}:${minutes}`;
}

export function militaryToStandardTime(militaryTime: string): string {
  const [hourStr, minuteStr] = militaryTime.split(":");
  let hour = Number.parseInt(hourStr);
  const minute = minuteStr.padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export function calculateAvailableTimeSlots(
  date: Date,
  dayAvailability: DayAvailability,
  busyTimeSlots: FreeBusyTimeSlot[],
  duration: number,
) {
  // convert date to string
  const dateString = format(date, "yyyy-MM-dd");

  // convert availability times to a javascript Date object
  const availableStart = parse(
    `${dateString} ${formatTime(dayAvailability.startTime)}`,
    "yyyy-MM-dd HH:mm",
    new Date(),
  );

  const availableEnd = parse(
    `${dateString} ${formatTime(dayAvailability.endTime)}`,
    "yyyy-MM-dd HH:mm",
    new Date(),
  );

  // convert unix time slots to javascript Dates
  const busySlots = busyTimeSlots.map(slot => ({
    start: fromUnixTime(slot.startTime),
    end: fromUnixTime(slot.endTime),
  }));

  // create all the time slots
  const allSlots = [];
  let currentSlot = availableStart;

  // the time between each slot is the same as the meeting duration
  while (isBefore(currentSlot, availableEnd)) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, duration);
  }

  const now = new Date();

  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);
    return (
      isAfter(slot, now) // only pick slots available after the current time
      && !busySlots.some( // make sure the slot does not overlap any busy period from nylas
        (busy: { start: any; end: any }) =>
          (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) // if slot starts during busy period
          || (isAfter(slotEnd, busy.start) && !isAfter(slotEnd, busy.end)) // if slot ends during busy period
          || (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end)), // if slot is during a busy period
      ) // else the slot is free and return it
    );
  });

  return freeSlots.map(slot => format(slot, "HH:mm"));
}

export const times = [
  { id: 0, value: 0, label: "12:00 AM" },
  { id: 1, value: 30, label: "12:30 AM" },
  { id: 2, value: 100, label: "1:00 AM" },
  { id: 3, value: 130, label: "1:30 AM" },
  { id: 4, value: 200, label: "2:00 AM" },
  { id: 5, value: 230, label: "2:30 AM" },
  { id: 6, value: 300, label: "3:00 AM" },
  { id: 7, value: 330, label: "3:30 AM" },
  { id: 8, value: 400, label: "4:00 AM" },
  { id: 9, value: 430, label: "4:30 AM" },
  { id: 10, value: 500, label: "5:00 AM" },
  { id: 11, value: 530, label: "5:30 AM" },
  { id: 12, value: 600, label: "6:00 AM" },
  { id: 13, value: 630, label: "6:30 AM" },
  { id: 14, value: 700, label: "7:00 AM" },
  { id: 15, value: 730, label: "7:30 AM" },
  { id: 16, value: 800, label: "8:00 AM" },
  { id: 17, value: 830, label: "8:30 AM" },
  { id: 18, value: 900, label: "9:00 AM" },
  { id: 19, value: 930, label: "9:30 AM" },
  { id: 20, value: 1000, label: "10:00 AM" },
  { id: 21, value: 1030, label: "10:30 AM" },
  { id: 22, value: 1100, label: "11:00 AM" },
  { id: 23, value: 1130, label: "11:30 AM" },
  { id: 24, value: 1200, label: "12:00 PM" },
  { id: 25, value: 1230, label: "12:30 PM" },
  { id: 26, value: 1300, label: "1:00 PM" },
  { id: 27, value: 1330, label: "1:30 PM" },
  { id: 28, value: 1400, label: "2:00 PM" },
  { id: 29, value: 1430, label: "2:30 PM" },
  { id: 30, value: 1500, label: "3:00 PM" },
  { id: 31, value: 1530, label: "3:30 PM" },
  { id: 32, value: 1600, label: "4:00 PM" },
  { id: 33, value: 1630, label: "4:30 PM" },
  { id: 34, value: 1700, label: "5:00 PM" },
  { id: 35, value: 1730, label: "5:30 PM" },
  { id: 36, value: 1800, label: "6:00 PM" },
  { id: 37, value: 1830, label: "6:30 PM" },
  { id: 38, value: 1900, label: "7:00 PM" },
  { id: 39, value: 1930, label: "7:30 PM" },
  { id: 40, value: 2000, label: "8:00 PM" },
  { id: 41, value: 2030, label: "8:30 PM" },
  { id: 42, value: 2100, label: "9:00 PM" },
  { id: 43, value: 2130, label: "9:30 PM" },
  { id: 44, value: 2200, label: "10:00 PM" },
  { id: 45, value: 2230, label: "10:30 PM" },
  { id: 46, value: 2300, label: "11:00 PM" },
  { id: 47, value: 2330, label: "11:30 PM" },
];

export const timeZones: string[] = [
  "UTC",
  "GMT",
  "EST",
  "EDT",
  "CST",
  "CDT",
  "MST",
  "MDT",
  "PST",
  "PDT",
  "AKST",
  "AKDT",
  "HST",
  "AST",
  "NST",
  "CET",
  "CEST",
  "EET",
  "EEST",
  "IST - India",
  "CST - China",
  "JST",
  "AEST",
  "AEDT",
  "NZST",
  "NZDT",
];
