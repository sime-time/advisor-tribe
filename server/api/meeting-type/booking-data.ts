import { ZodError } from "zod/v4";
import { getAvailability } from "~/db/queries/read/get-availability";
import { getMeetingTypeFromUrl } from "~/db/queries/read/get-meeting-type";
import { MeetingSlugSchema } from "~/validation/meeting-slug-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // body should contain { userLink, meetingSlug }
    const validData = MeetingSlugSchema.parse({
      userLink: body.userLink,
      meetingSlug: body.meetingSlug,
    });

    // result is an array of 0 or 1 items
    const result = await getMeetingTypeFromUrl(validData.meetingSlug, validData.userLink);
    if (result.length === 0) {
      throw new Error("No meeting type found");
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
