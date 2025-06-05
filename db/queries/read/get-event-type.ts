import { eq } from "drizzle-orm";
import db from "~/db/index";
import { eventType } from "~/db/schema/index";

export async function getEventType(userId: number) {
  const eventTypes = await db.select().from(eventType).where(eq(eventType.userId, userId));
  return eventTypes;
}
