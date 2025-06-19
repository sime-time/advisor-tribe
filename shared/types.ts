import type { InferSelectModel } from "drizzle-orm";
import type { meetingType } from "~/db/schema/index";

export type MeetingType = InferSelectModel<typeof meetingType>;
