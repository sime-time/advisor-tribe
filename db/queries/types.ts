export interface AdvisorCategory {
  id: number;
  advisorId: number;
  categoryId: number | null;
  categoryName: string | null;
  isPrimary: boolean;
}

export interface AdvisorUser {
  id: number;
  title: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  userId: number;
  name: string;
  email: string;
  image: string | null;
  linkName: string | null;
  timeZone: string | null;
  categories: AdvisorCategory[];
}

export interface NewAdvisor {
  userId: number;
  title: string;
  bio: string;
  city: string;
  state: string;
  country: string;
}

export interface AdvisorPlan {
  title: string;
  description: string;
  features: string[];
  billing: {
    frequency: string;
    price: string;
  }[];
}

export interface NewPlan {
  advisorId: number;
  title: string;
  description: string;
  features: string[];
  pricing: NewPlanPricing[];
}

export interface NewPlanPricing {
  amount: number;
  frequency: string;
}

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
  grantId: string | null;
  grantEmail: string | null;
  availability?: DayAvailability[];
}
