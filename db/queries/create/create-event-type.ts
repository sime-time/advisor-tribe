import type { EventTypeSchema } from "~/validation/new-event-schema";
import db from "~/db/index";
import { eventType } from "~/db/schema/index";

export async function createEventType(newEventType: EventTypeSchema) {
  return await db.insert(eventType).values(newEventType);
}
