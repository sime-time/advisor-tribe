import type { AdvisorUser } from "~/db/queries/types";
import { getAdvisorsWithCategories } from "~/db/queries/get-advisors";

export default defineEventHandler(async () => {
	const advisors: AdvisorUser[] = await getAdvisorsWithCategories();
	return advisors;
});
