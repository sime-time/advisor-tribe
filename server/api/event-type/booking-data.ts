import { ZodError } from "zod/v4";
import { getAvailability } from "~/db/queries/read/get-availability";
import { getEventTypeFromSlug } from "~/db/queries/read/get-event-type";
import { EventSlugSchema } from "~/validation/event-slug-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // body should contain { userLink, eventSlug }
    const validData = EventSlugSchema.parse({
      userLink: body.userLink,
      eventSlug: body.eventSlug,
    });

    // result is an array of 0 or 1 items
    const result = await getEventTypeFromSlug(validData.eventSlug, validData.userLink);
    if (result.length === 0) {
      throw new Error("No event type found");
    }
    else if (!result[0].userId) {
      throw new Error("No user id found for this event");
    }

    // availability is an array of 7 days
    const availability = await getAvailability(result[0].userId);

    return {
      ...result[0], // 1 obj
      availability, // array of 7 obj
    };
  }
  catch (err: any) {
    console.error("Booking Data Error:", err);

    // send to error page if booking data not found
    // return await sendRedirect(event, "/error", 404);

    // return any validation error first
    if (err instanceof ZodError) {
      return createError({
        statusCode: 400,
        message: err.issues[0].message || "Invalid input",
      });
    }
    return createError({
      statusCode: 500,
      message: err.message || "An error occurred",
    });
  }
});
