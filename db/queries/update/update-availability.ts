import type { DayAvailability } from "../types";
import { eq } from "drizzle-orm";
import db from "~/db/index";
import { availability } from "~/db/schema/index";

export async function updateAvailability(week: DayAvailability[]) {
  // use a transaction to make sure updates are atomic
  return await db.transaction(async (tx) => {
    // iterate through array
    for (const day of week) {
      // perform an update for each day based on id
      await tx.update(availability).set({
        weekDay: day.weekDay,
        startTime: day.startTime,
        endTime: day.endTime,
        isActive: day.isActive,
        updatedAt: new Date(),
      }).where(eq(availability.id, day.id));
    }
  });
}
