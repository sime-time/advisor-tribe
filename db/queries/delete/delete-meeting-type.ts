import { eq } from "drizzle-orm";
import db from "~/db/index";
import { meetingType } from "~/db/schema/index";

/**
 * Delete a meeting type by its ID.
 * @param id The meeting type ID to delete.
 * @returns The number of rows deleted.
 */
export async function deleteMeetingType(id: number) {
  const result = await db.delete(meetingType).where(eq(meetingType.id, id));
  return result.rowCount ?? 0;
}
