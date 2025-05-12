import type { AdvisorPlan } from "~/db/queries/types";
import { getAdvisorPlans } from "~/db/queries/get-plans";

export default defineEventHandler(async (event) => {
	let advisorId: number = -1;
	if (event.context.params) {
		advisorId = Number.parseInt(event.context.params.advisorId);
	}

	try {
		const advisorPlans: AdvisorPlan[] | null = await getAdvisorPlans(advisorId);
		return advisorPlans;
	}
	catch (err) {
		console.error("Error:", err);
		throw createError({
			statusCode: 500,
			message: String(err),
		});
	}
});
