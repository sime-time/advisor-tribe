import type { AdvisorCategory, AdvisorUser } from "./types";
import { eq } from "drizzle-orm";
import db from "../index";
import { advisor, advisorCategory, category, user } from "../schema/index";

// advisor data with user details
export async function getAdvisorUsers() {
	return await db.select({
		id: advisor.id,
		userId: user.id,
		name: user.name,
		email: user.email,
		image: user.image,
		prefix: advisor.prefix,
		title: advisor.title,
		bio: advisor.bio,
		city: advisor.city,
		state: advisor.state,
		country: advisor.country,
	})
		.from(advisor)
		.innerJoin(user, eq(user.id, advisor.userId));
}

// make a separate function for returning single advisors
export async function getSingleAdvisor(advisorId: number) {
	const result = await db.select({
		id: advisor.id,
		userId: user.id,
		name: user.name,
		email: user.email,
		image: user.image,
		prefix: advisor.prefix,
		title: advisor.title,
		bio: advisor.bio,
		city: advisor.city,
		state: advisor.state,
		country: advisor.country,
	})
		.from(advisor)
		.where(eq(advisor.id, advisorId))
		.innerJoin(user, eq(user.id, advisor.userId))
		.limit(1);

	return result; // this will return an array to feed into other functions
}

export async function getAdvisorCategories() {
	return await db.select({
		id: advisorCategory.id,
		advisorId: advisorCategory.advisorId,
		categoryId: category.id,
		categoryName: category.name,
		isPrimary: advisorCategory.isPrimary,
	})
		.from(advisorCategory)
		.leftJoin(category, eq(category.id, advisorCategory.categoryId));
}

// combine advisors with corresponding categories
// using map functions instead of multiple sql left joins
export async function getAdvisorsWithCategories(advisorId?: number) {
	let advisorUsers;
	if (advisorId) {
		advisorUsers = await getSingleAdvisor(advisorId);
	}
	else {
		advisorUsers = await getAdvisorUsers();
	}
	const categories = await getAdvisorCategories();

	const result = advisorUsers.map((advisor) => {
		// find all categories belonging to this advisor
		const thisAdvisorsCategories = categories.filter(category => category.advisorId === advisor.id);

		// return a new object that includes each advisor plus list of categories
		return {
			...advisor,
			categories: thisAdvisorsCategories as AdvisorCategory[],
		} as AdvisorUser;
	});

	return result;
}
