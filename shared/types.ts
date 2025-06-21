import type { InferSelectModel } from "drizzle-orm";
import type { meetingType } from "~/db/schema/index";

export type MeetingType = InferSelectModel<typeof meetingType>;

export interface DaySchedule {
  advisorId: number;
  active: boolean;
  weekDay: string;
  startTime: number;
  endTime: number;
}

export interface UserUpdate {
  id: number;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string | null;
  role?: string | null;
  linkName?: string | null;
  timeZone?: string | null;
  grantId?: string | null;
  grantEmail?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DayAvailability {
  id: number;
  weekDay: number;
  userId: number;
  startTime: number;
  endTime: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookingData {
  id: number;
  title: string;
  duration: number;
  slug: string;
  description: string;
  isActive: boolean | null;
  videoCallSoftware: string | null;
  userId: number | null;
  userName: string | null;
  userImage: string | null;
  userTimeZone: string | null;
  grantId: string;
  grantEmail: string;
  availability?: DayAvailability[];
}
