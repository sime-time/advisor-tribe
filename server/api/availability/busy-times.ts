import type { FreeBusyTimeSlot } from "nylas";
import { ZodError } from "zod/v4";
import { nylas } from "~/lib/nylas";
import { GrantSchema } from "~/validation/grant-schema";

// convert Date to unix timestamps
function convertDateToUnix(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // validate body data
    const validData = GrantSchema.parse(body);

    // get the start and end times of the day
    const startOfDay = new Date(validData.selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(validData.selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // call nylas api
    const nylasCalendarData = await nylas.calendars.getFreeBusy({
      identifier: validData.grantId,
      requestBody: {
        emails: [validData.grantEmail],
        startTime: convertDateToUnix(startOfDay),
        endTime: convertDateToUnix(endOfDay),
      },
    });

    // returns an array of Date strings
    const busyTimes = nylasCalendarData.data[0].timeSlots;

    return busyTimes as FreeBusyTimeSlot[];
  }
  catch (err) {
    console.error("Error getting busy times:", err);
    // return any input validation error
    if (err instanceof ZodError) {
      return createError({
        statusCode: 400,
        message: err.issues[0].message,
      });
    }
    return createError({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
