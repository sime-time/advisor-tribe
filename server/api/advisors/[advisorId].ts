import type { AdvisorUser } from "~/db/queries/types";
import { getFullAdvisorData } from "~/db/queries/read/get-advisors";

export default defineEventHandler(async (event) => {
  try {
    const advisorId = Number.parseInt(event.context.params?.advisorId ?? "");
    if (!advisorId) {
      throw new Error("Invalid or missing advisor id");
    }

    const advisors: AdvisorUser[] = await getFullAdvisorData(advisorId);
    if (advisors.length < 1) {
      throw new Error("No advisor found with that id");
    }

    return advisors[0] as AdvisorUser; // this array will have 1 item
  }
  catch (error) {
    console.log(error);
  }
});
