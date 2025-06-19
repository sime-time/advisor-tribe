import type { MeetingType } from "~/shared/types";
import { eq } from "drizzle-orm";
import db from "~/db/index";
import { meetingType } from "~/db/schema/index";

export async function updateMeetingType(mt: MeetingType) {
  return await db
    .update(meetingType)
    .set(mt)
    .where(eq(meetingType.id, mt.id));
}
