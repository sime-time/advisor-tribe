import { z } from "zod/v4";

export const EventSlugSchema = z.object({
  userLink: z.string().min(1, "User link slug is required"),
  eventSlug: z.string().min(1, "Event slug is required"),
});

export type EventSlugSchema = z.infer<typeof EventSlugSchema>;
