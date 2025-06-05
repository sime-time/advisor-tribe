import { getEventType } from "~/db/queries/read/get-event-type";

export default defineEventHandler(async (event) => {
  const userId = Number.parseInt(event.context.params?.userId ?? "");
  if (!userId) {
    const err = "Invalid or missing user id";
    console.error(err);
    return createError({ status: 400, message: err });
  }

  try {
    // fetch the user's event types
    const data = await getEventType(userId);

    // return even if there are zero event types,
    // client will handle what to display when there are no event types
    return data;
  }
  catch (error) {
    console.error("Get Event Type Error:", error);
    return createError({ status: 500, message: "Internal Server Error" });
  }
});
