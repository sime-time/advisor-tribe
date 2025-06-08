import { and, eq } from "drizzle-orm";
import db from "~/db/index";
import { eventType, user } from "~/db/schema/index";

export async function getEventType(userId: number) {
  const eventTypes = await db
    .select()
    .from(eventType)
    .where(eq(eventType.userId, userId));

  return eventTypes;
}

export async function getEventTypeFromSlug(slug: string, userLink: string) {
  const result = await db
    .select({
      // select fields from eventType
      id: eventType.id,
      title: eventType.title,
      duration: eventType.duration,
      slug: eventType.slug,
      description: eventType.description,
      isActive: eventType.isActive,
      videoCallSoftware: eventType.videoCallSoftware,
      // select fields from user
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      userTimeZone: user.timeZone,
    })
    .from(eventType)
    .leftJoin(user, eq(eventType.userId, user.id)) // join with the user table
    .where(
      and(
        eq(eventType.slug, slug),
        eq(user.linkName, userLink),
        eq(eventType.isActive, true),
      ),
    )
    .limit(1); // ensure only 1 record is returned

  // the result is an array of 0 or 1 item
  return result;
}
