import type { DaySchedule } from "~/db/queries/types";
import { z } from "zod";
import { createAdvisorSchedule } from "~/db/queries/create-advisor";
import { getAdvisorIdFromUserId } from "~/db/queries/get-advisors";
import { hourStringToNumber } from "~/lib/time";

const RequestSchema = z.object({
	userId: z.string(),
	schedule: z.array(z.object({
		name: z.string(),
		active: z.boolean(),
		start: z.string(),
		end: z.string(),
		timezone: z.string(),
	})),
});
type RequestSchema = z.infer<typeof RequestSchema>;

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody<RequestSchema>(event);

		// get advisor id from user id
		const advisorId = await getAdvisorIdFromUserId(Number(body.userId));

		// convert start/end times to numbers
		const weekSchedule = body.schedule.map((day) => {
			const militaryStartTime = hourStringToNumber.get(day.start) as number;
			const militaryEndTime = hourStringToNumber.get(day.end) as number;

			// throw error back to client if end time is before start time
			if (militaryStartTime >= militaryEndTime) {
				throw new Error("End time cannot be before Start time");
			}

			return {
				advisorId,
				active: day.active,
				weekDay: day.name,
				timezone: day.timezone,
				startTime: militaryStartTime,
				endTime: militaryEndTime,
			} as DaySchedule;
		});

		// save schedule to database
		const data = await createAdvisorSchedule(weekSchedule);

		return data;
	}
	catch (error: any) {
		console.error("Set availability error:", error);
		throw createError({
			statusCode: 500,
			message: error?.message,
		});
	}
});
