import { z } from "zod/v4";

export const GrantSchema = z.object({
  grantId: z.string(),
  grantEmail: z.email(),
  selectedDate: z.string().optional(),
});
export type GrantSchema = z.infer<typeof GrantSchema>;
