import type { MeetingTypeSchema } from "~/validation/new-meeting-schema";
import db from "~/db/index";
import { meetingType } from "~/db/schema/index";

export async function createMeetingType(newMeetingType: MeetingTypeSchema) {
  return await db.insert(meetingType).values(newMeetingType);
}
