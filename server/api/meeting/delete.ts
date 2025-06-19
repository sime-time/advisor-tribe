import { ZodError } from "zod/v4";
import { nylas } from "~/lib/nylas";
import { DeleteMeetingSchema } from "~/validation/delete-meeting-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const validBody = DeleteMeetingSchema.parse(body);

    const data = await nylas.events.destroy({
      eventId: validBody.eventId,
      identifier: validBody.grantId,
      queryParams: {
        calendarId: validBody.calendarId || "primary",
      },
    });

    return data;
  }
  catch (err: any) {
    console.error("Delete Meeting Error:", err);

    if (err instanceof ZodError) {
      return createError({
        statusCode: 400,
        message: err.issues[0].message,
      });
    }
    return createError({
      statusCode: 500,
      message: err.message || "An error occurred",
    });
  }
});
