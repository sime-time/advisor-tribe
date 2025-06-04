import { ZodError } from "zod";
import { updateAvailability } from "~/db/queries/update/update-availability";
import { updateUser } from "~/db/queries/update/update-user";
import { ScheduleSchema } from "~/validation/schedule-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // validate body data
    const validData = ScheduleSchema.parse(body);

    // update user's availability
    await updateAvailability(validData.weekSchedule);

    // update user's time zone
    await updateUser({
      id: validData.weekSchedule[0].userId,
      timeZone: validData.timeZone,
    });
  }
  catch (err) {
    console.error("Update availability error:", err);
    // return any validation error first
    if (err instanceof ZodError) {
      return createError({
        statusCode: 400,
        message: err.message,
      });
    }
    return createError({
      statusCode: 500,
      message: "Failed to update availability",
    });
  }
});
