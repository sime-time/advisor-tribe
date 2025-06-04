import type { AdvisorPlan } from "~/db/queries/types";
import { getAdvisorPlans } from "~/db/queries/read/get-plans";

export default defineEventHandler(async (event) => {
  try {
    const advisorId = Number.parseInt(event.context.params?.advisorId ?? "");
    if (!advisorId) {
      throw new Error("Invalid or missing advisor id");
    }
    const advisorPlans: AdvisorPlan[] | null = await getAdvisorPlans(advisorId);
    if (!advisorPlans) {
      throw new Error("No plans found from that advisor");
    }
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
