import { auth } from "~/lib/auth";
import { nylas } from "~/lib/nylas";

export default defineEventHandler(async (event) => {
// get user session data
  const reqHeaders = getRequestHeaders(event);
  const session = await auth.api.getSession({
    headers: new Headers(reqHeaders),
  });

  if (!session?.user?.grantId || !session?.user?.grantEmail) {
    return [];
  }

  // get all the meetings from nylas api
  const meetings = await nylas.events.list({
    identifier: session?.user.grantId as string,
    queryParams: {
      calendarId: session?.user.grantEmail as string,
    },
  });

  return meetings.data;
});
