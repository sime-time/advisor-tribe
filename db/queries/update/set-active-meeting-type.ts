import { eq } from "drizzle-orm";
import db from "~/db/index";
import { meetingType } from "~/db/schema/index";

export async function setActiveMeetingType(meetingTypeId: number, isActive: boolean) {
  return await db
    .update(meetingType)
    .set({
      isActive,
    })
    .where(eq(meetingType.id, meetingTypeId));
}
