import type { AdvisorUser } from "~/lib/db/queries/types";
import { getAdvisorsWithCategories } from "~/lib/db/queries/get-users";

export default defineEventHandler(async () => {
	await new Promise(resolve => setTimeout(resolve, 2000));
	const advisors: AdvisorUser[] = await getAdvisorsWithCategories();
	return advisors;
});
