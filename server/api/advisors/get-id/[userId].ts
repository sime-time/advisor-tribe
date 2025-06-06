import { getAdvisorIdFromUserId } from "~/db/queries/read/get-advisors";

export default defineEventHandler(async (event) => {
  try {
    const userId = Number.parseInt(event.context.params?.userId ?? "");
    if (!userId) {
      throw new Error("Invalid or missing user id");
    }

    const advisorId: number = await getAdvisorIdFromUserId(userId);
    if (!advisorId) {
      throw new Error("No advisor found with that user id");
    }

    return advisorId;
  }
  catch (error) {
    console.log(error);
  }
});
