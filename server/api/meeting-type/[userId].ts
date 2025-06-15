import { getMeetingType } from "~/db/queries/read/get-meeting-type";

export default defineEventHandler(async (event) => {
  const userId = Number.parseInt(event.context.params?.userId ?? "");
  if (!userId) {
    const err = "Invalid or missing user id";
    console.error(err);
    return createError({ status: 400, message: err });
  }

  try {
    // fetch the user's meeting types
    const data = await getMeetingType(userId);

    // return even if there are zero meeting types,
    // client will handle what to display when there are no meeting types
    return data;
  }
  catch (error) {
    console.error("Get Meeting Type Error:", error);
    return createError({ status: 500, message: "Internal Server Error" });
  }
});
