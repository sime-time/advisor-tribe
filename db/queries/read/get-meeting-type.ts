import { and, eq } from "drizzle-orm";
import db from "~/db/index";
import { meetingType, user } from "~/db/schema/index";

export async function getMeetingType(userId: number) {
  const meetingTypes = await db
    .select()
    .from(meetingType)
    .where(eq(meetingType.userId, userId));

  return meetingTypes;
}

export async function getMeetingTypeFromSlug(slug: string, userLink: string) {
  const result = await db
    .select({
      // select fields from meetingType
      id: meetingType.id,
      title: meetingType.title,
      duration: meetingType.duration,
      slug: meetingType.slug,
      description: meetingType.description,
      isActive: meetingType.isActive,
      videoCallSoftware: meetingType.videoCallSoftware,
      // select fields from user
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      userTimeZone: user.timeZone,
      grantId: user.grantId,
      grantEmail: user.grantEmail,
    })
    .from(meetingType)
    .leftJoin(user, eq(meetingType.userId, user.id)) // join with the user table
    .where(
      and(
        eq(meetingType.slug, slug),
        eq(user.linkName, userLink),
        eq(meetingType.isActive, true),
      ),
    )
    .limit(1); // ensure only 1 record is returned

  // the result is an array of 0 or 1 item
  return result;
}
