import type { Event } from "nylas";
import { ZodError } from "zod/v4";
import { nylas } from "~/lib/nylas";
import { GrantSchema } from "~/validation/grant-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const validBody = GrantSchema.parse(body);

    const meetings = await nylas.events.list({
      identifier: validBody.grantId,
      queryParams: {
        calendarId: validBody.grantEmail,
      },
    });

    console.log("meetings.data", meetings.data);

    return meetings.data as Event[];
  }
  catch (err: any) {
    console.error("Error returning meeting list", err);

    if (err instanceof ZodError) {
      return createError({
        status: 400,
        message: err.issues[0].message,
      });
    }
    return createError({
      status: 500,
      message: err.message || "An error occured",
    });
  }
});
