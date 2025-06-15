import { z } from "zod/v4";

export const BookMeetingSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  title: z.string().min(1),
  description: z.string().min(3),
  date: z.string().min(4),
  time: z.string(),
  duration: z.number(),
  grantId: z.string(),
  grantEmail: z.email(),
  videoCallSoftware: z.string(),
});
export type BookMeetingSchema = z.infer<typeof BookMeetingSchema>;
