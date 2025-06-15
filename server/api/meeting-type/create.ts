import { ZodError } from "zod/v4";
import { createMeetingType } from "~/db/queries/create/create-meeting-type";
import { MeetingTypeSchema } from "~/validation/new-meeting-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // validate body data
    const validData = MeetingTypeSchema.parse(body);

    return await createMeetingType(validData);
  }
  catch (err: any) {
    console.error("Create Meeting Type Error:", err);

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
