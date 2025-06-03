import { z } from "zod/v4";

export const DaySchema = z.object({
	id: z.coerce.number(),
	weekDay: z.coerce.number().min(0).max(6),
	userId: z.coerce.number(),
	startTime: z.coerce.number().min(0).max(2400),
	endTime: z.coerce.number().min(0).max(2400),
	isActive: z.boolean(),
});

export const ScheduleSchema = z.object({
	timeZone: z.string().min(1, "Must select a time zone"),
	weekSchedule: z.array(DaySchema),
});

export type ScheduleSchema = z.infer<typeof ScheduleSchema>;
