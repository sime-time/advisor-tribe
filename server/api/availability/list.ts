import type { DayAvailability } from "~/db/queries/types";
import { getAvailability } from "~/db/queries/read/get-availability";
import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  // get user session data
  const reqHeaders = getRequestHeaders(event);
  const session = await auth.api.getSession({
    headers: new Headers(reqHeaders),
  });

  if (!session?.user) {
    return createError({ status: 400, message: "No user found" });
  }

  try {
    const userId = Number.parseInt(session?.user.id);

    // fetch the 7-day availability of this user
    const week: DayAvailability[] = await getAvailability(userId);
    if (week.length === 0) {
      const err = "Availability Not Found";
      console.error(err);
      return createError({ status: 404, message: err });
    }

    // get the timezone from this user
    const timeZone = session?.user.timeZone;
    if (!timeZone) {
      const err = "Time Zone Not Found";
      console.error(err);
      return createError({ status: 404, message: err });
    }

    return {
      timeZone,
      week,
    };
  }
  catch (error) {
    console.error("Get Availability Error:", error);
    return createError({ status: 500, message: "Internal Server Error" });
  }
});
