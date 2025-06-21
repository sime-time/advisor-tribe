import { getMeetingType } from "~/db/queries/read/get-meeting-type";

export default defineEventHandler(async (event) => {
  try {
    // get the rest api url param
    const meetingTypeId = Number.parseInt(event.context.params?.id as string);
    if (!meetingTypeId) {
      throw new Error("Invalid or missing meeting type id");
    }

    // query the meeting type
    const result = await getMeetingType(meetingTypeId);
    if (!result) {
      throw new Error("No meeting type found");
    }

    return result;
  }
  catch (err: any) {
    console.error("Error getting meeting type", err);
    return createError({
      statusCode: 500,
      message: err.message || "An error occurred",
    });
  }
});
