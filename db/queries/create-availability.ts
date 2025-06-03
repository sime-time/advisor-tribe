import db from "~/db/index";
import { availability } from "~/db/schema/index";
import { Day } from "~/lib/time";

export async function createAvailability(userId: number) {
	// insert all 7 days of the week
	// Object.values(Day) returns an array containing both the numeric values and the string keys:
	const week = Object.values(Day)
		.filter(value => typeof value === "number")
		.map(weekDay => ({
			userId,
			weekDay: weekDay as Day, // Cast back to Day enum type (0-6)
			startTime: 900, // Default start time (9:00 AM)
			endTime: 1700, // Default end time (5:00 PM)
			isActive: true, // Default to active
		}));

	return await db.insert(availability).values(week);
}
