import { z } from "zod/v4";

export const DeleteMeetingSchema = z.object({
  grantId: z.string().min(1),
  calendarId: z.email().optional(),
  eventId: z.string().min(1),
});
export type DeleteMeetingSchema = z.infer<typeof DeleteMeetingSchema>;
