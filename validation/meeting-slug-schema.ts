import { z } from "zod/v4";

export const MeetingSlugSchema = z.object({
  userLink: z.string().min(1, "User link slug is required"),
  meetingSlug: z.string().min(1, "Meeting link slug is required"),
});

export type MeetingSlugSchema = z.infer<typeof MeetingSlugSchema>;
