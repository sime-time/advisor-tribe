import { deleteMeetingType } from "~/db/queries/delete/delete-meeting-type";

export default defineEventHandler(async (event) => {
  try {
    // get the rest api url param
    const meetingTypeId = Number.parseInt(event.context.params?.id as string);
    if (!meetingTypeId) {
      throw new Error("Invalid or missing meeting type id");
    }

    // delete the meeting type
    const result = await deleteMeetingType(meetingTypeId);
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
