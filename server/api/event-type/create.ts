import { ZodError } from "zod/v4";
import { createEventType } from "~/db/queries/create/create-event-type";
import { EventTypeSchema } from "~/validation/new-event-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // validate body data
    const validData = EventTypeSchema.parse(body);

    return await createEventType(validData);
  }
  catch (err: any) {
    console.error("Create Event Type Error:", err);

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
