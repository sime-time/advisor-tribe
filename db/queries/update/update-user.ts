import type { UserUpdate } from "../../../shared/types";
import { eq } from "drizzle-orm";
import db from "~/db/index";
import { user } from "~/db/schema/index";

export async function updateUser(userData: UserUpdate) {
  return await db.update(user).set({
    name: userData.name,
    linkName: userData.linkName,
    grantId: userData.grantId,
    grantEmail: userData.grantEmail,
    timeZone: userData.timeZone,
  }).where(eq(user.id, userData.id));
}
