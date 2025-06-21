import { z } from "zod/v4";

export const SetActiveSchema = z.object({
  isActive: z.boolean(),
  meetingTypeId: z.coerce.number(),
});

export type SetActiveSchema = z.infer<typeof SetActiveSchema>;
