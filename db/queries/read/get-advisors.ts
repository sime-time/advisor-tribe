import type { AdvisorCategory, AdvisorUser } from "../types";
import { eq } from "drizzle-orm";
import db from "../../index";
import { advisor, advisorCategory, category, user } from "../../schema/index";

// return advisor data with user details
export async function getAllAdvisors() {
  return await db.select({
    id: advisor.id,
    title: advisor.title,
    bio: advisor.bio,
    city: advisor.city,
    state: advisor.state,
    country: advisor.country,
    userId: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    linkName: user.linkName,
    timeZone: user.timeZone,
  })
    .from(advisor)
    .innerJoin(user, eq(user.id, advisor.userId));
}

// follow single-responsibility principle:
// make a separate function to return 1 single advisor
export async function getSingleAdvisor(advisorId: number) {
  const result = await db.select({
    id: advisor.id,
    title: advisor.title,
    bio: advisor.bio,
    city: advisor.city,
    state: advisor.state,
    country: advisor.country,
    userId: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    linkName: user.linkName,
    timeZone: user.timeZone,
  })
    .from(advisor)
    .where(eq(advisor.id, advisorId))
    .innerJoin(user, eq(user.id, advisor.userId))
    .limit(1);

  // this will return an ARRAY of 1 item for consistency with other functions
  return result;
}

export async function getAdvisorIdFromUserId(userId: number) {
  const result = await db.select({
    id: advisor.id,
  })
    .from(advisor)
    .where(eq(advisor.userId, userId))
    .limit(1);

  return result[0].id;
}

// helper function
async function getAdvisorCategories() {
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

// combine advisors with their corresponding categories
// use map functions instead of multiple sql left joins (easier to read)
export async function getFullAdvisorData(advisorId?: number) {
  let advisorUsers;

  // getting a single advisor with return an array with one item
  // this makes the map function work consistently
  if (advisorId) {
    advisorUsers = await getSingleAdvisor(advisorId);
  }
  else {
    advisorUsers = await getAllAdvisors();
  }

  const categories = await getAdvisorCategories();

  const result = advisorUsers.map((advisor) => {
    // find all categories belonging to this advisor
    const thisAdvisorsCategories = categories.filter(category => category.advisorId === advisor.id);

    // return AdvisorUser object that includes the advisor plus their list of categories
    return {
      ...advisor,
      categories: thisAdvisorsCategories as AdvisorCategory[],
    } as AdvisorUser;
  });

  return result;
}
