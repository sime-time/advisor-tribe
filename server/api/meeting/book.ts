import { ZodError } from "zod/v4";
import { nylas } from "~/lib/nylas";
import { BookMeetingSchema } from "~/validation/book-meeting-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const validBody = BookMeetingSchema.parse(body);

    // convert date and time strings into a DateTime object
    const startDateTime = new Date(`${validBody.date}T${validBody.time}:00`);

    // from minutes to milliseconds
    const meetingDuration = Number(validBody.duration) * 60 * 1000;

    // endTime = startTime + meeting duration
    const endDateTime = new Date(startDateTime.getTime() + meetingDuration);
    console.log("nylas req data", {
      identifier: validBody.grantId,
      requestBody: {
        title: validBody.title,
        description: validBody.description,
        when: {
          startTime: Math.floor(startDateTime.getTime() / 1000), // convert to unix time
          endTime: Math.floor(endDateTime.getTime() / 1000),
        },
        conferencing: {
          autocreate: {},
          provider: validBody.videoCallSoftware as any,
        },
        participants: [
          {
            name: validBody.name,
            email: validBody.email,
            status: "yes",
          },
        ],
      },
      queryParams: {
        calendarId: validBody.grantEmail,
        notifyParticipants: true, // via email
      },
    });

    await nylas.events.create({
      identifier: validBody.grantId,
      requestBody: {
        title: validBody.title,
        description: validBody.description,
        when: {
          startTime: Math.floor(startDateTime.getTime() / 1000), // convert to unix time
          endTime: Math.floor(endDateTime.getTime() / 1000),
        },
        conferencing: {
          autocreate: {},
          provider: validBody.videoCallSoftware as any,
        },
        participants: [
          {
            name: validBody.name,
            email: validBody.email,
            status: "yes",
          },
        ],
      },
      queryParams: {
        calendarId: validBody.grantEmail,
        notifyParticipants: true, // via email
      },
    });
  }
  catch (err: any) {
    console.error("Book Meeting Error:", err);

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
