import { ZodError } from "zod/v4";
import { updateMeetingType } from "~/db/queries/update/update-meeting-type";
import { UpdateMeetingTypeSchema } from "~/validation/update-meeting-type-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // validate body data
    const validData = UpdateMeetingTypeSchema.parse(body);

    return await updateMeetingType(validData);
  }
  catch (err: any) {
    console.error("Update Meeting Type Error:", err);

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
