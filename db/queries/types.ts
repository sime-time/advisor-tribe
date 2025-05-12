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
