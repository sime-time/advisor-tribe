import type { AdvisorUser } from "~/db/queries/types";
import { getFullAdvisorData } from "~/db/queries/read/get-advisors";

export default defineEventHandler(async () => {
  const advisors: AdvisorUser[] = await getFullAdvisorData();
  return advisors;
});
