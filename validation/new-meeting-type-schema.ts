import { z } from "zod/v4";

export const MeetingTypeSchema = z.object({
  userId: z.coerce.number(),
  title: z.string().min(1, "Title is required").max(150),
  description: z.string().min(3, "Description is required").max(300, "Description must be under 300 characters long"),
  duration: z.coerce.number().min(15).max(60),
  videoCallSoftware: z.string().min(3),
  slug: z
    .string()
    .min(3, "Slug name must have at least 3 characters")
    .regex(/^[a-z0-9-]+$/i, "Slug name can only contain letters, numbers, and - (dash)"),
});
export type MeetingTypeSchema = z.infer<typeof MeetingTypeSchema>;
