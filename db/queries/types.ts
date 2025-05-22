export interface AdvisorCategory {
	id: number;
	advisorId: number;
	categoryId: number | null;
	categoryName: string | null;
	isPrimary: boolean;
}

export interface AdvisorUser {
	id: number;
	userId: number;
	name: string;
	email: string;
	image: string | null;
	prefix: string | null;
	title: string;
	bio: string;
	city: string | null;
	state: string | null;
	country: string;
	categories: AdvisorCategory[];
}

export interface AdvisorPlan {
	title: string;
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

export interface NewAdvisor {
	userId: number;
	prefix?: string;
	title: string;
	bio: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
}

export interface DaySchedule {
	advisorId: number;
	active: boolean;
	timezone: string;
	weekDay: string;
	startTime: number;
	endTime: number;
}
