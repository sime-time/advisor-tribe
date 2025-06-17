import { auth } from "~/lib/auth"; // Assuming auth is configured for session management
import { nylas } from "~/lib/nylas"; // Assuming nylas SDK is initialized

export default defineEventHandler(async (event) => {
  // Ensure this handler only responds to DELETE requests
  assertMethod(event, "DELETE");

  // Get the eventId from the route parameters
  const eventId = getRouterParam(event, "eventId");
  if (!eventId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Event ID is required",
    });
  }

  // Get user session data
  // The `event` object is passed to getSession to correctly handle cookies/headers
  const session = await auth.api.getSession(event);

  if (!session?.user?.grantId || !session?.user?.grantEmail) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: Missing user grant information",
    });
  }

  const grantId = session.user.grantId as string;
  const calendarId = session.user.grantEmail as string; // Assuming grantEmail is the calendarId

  try {
    // Call Nylas API to delete the event
    await nylas.events.destroy({
      identifier: grantId,
      eventId,
      queryParams: {
        calendarId,
      },
    });

    console.log(`Event ${eventId} deleted successfully for calendar ${calendarId}`);
    return { success: true, message: "Event deleted successfully" };
  }
  catch (error: any) {
    console.error(`Error deleting event ${eventId}:`, error.message);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: `Failed to delete event: ${error.message || "Internal server error"}`,
    });
  }
});
