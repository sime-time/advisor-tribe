import { getMeetingType } from "~/db/queries/read/get-meeting-type";
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

    // fetch the user's meeting types
    const data = await getMeetingType(userId);

    // return even if there are zero meeting types,
    // client will handle what to display when there are no meeting types
    return data;
  }
  catch (error) {
    console.error("List Meeting Types Error:", error);
    return createError({ status: 500, message: "Internal Server Error" });
  }
});
