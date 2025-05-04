import { getAdvisors } from "~/lib/db/queries/get-advisors";

export default defineEventHandler(async () => {
	return await getAdvisors(6);
});
