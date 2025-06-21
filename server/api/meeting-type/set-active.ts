import { ZodError } from "zod/v4";
import { setActiveMeetingType } from "~/db/queries/update/set-active-meeting-type";
import { SetActiveSchema } from "~/validation/set-active-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // validate body data
    const validData = SetActiveSchema.parse(body);

    return await setActiveMeetingType(validData.meetingTypeId, validData.isActive);
  }
  catch (err: any) {
    console.error("Set Active Meeting Type Error:", err);

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
