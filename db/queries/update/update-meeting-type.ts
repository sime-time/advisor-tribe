import type { UpdateMeetingTypeSchema } from "~/validation/update-meeting-type-schema";
import { eq } from "drizzle-orm";
import db from "~/db/index";
import { meetingType } from "~/db/schema/index";

export async function updateMeetingType(mt: UpdateMeetingTypeSchema) {
  return await db
    .update(meetingType)
    .set(mt)
    .where(eq(meetingType.id, mt.id));
}
