import type { DayAvailability } from "~/db/queries/types";
import { getAvailability } from "~/db/queries/get-availability";

export default defineEventHandler(async (event) => {
	const userId = Number.parseInt(event.context.params?.userId ?? "");
	if (!userId) {
		const err = "Invalid or missing user id";
		console.error(err);
		return createError({ status: 400, message: err });
	}

	try {
		// fetch the availability of this user
		const data = await getAvailability(userId);

		if (data.length === 0) {
			const err = "Availability Not Found";
			console.error(err);
			return createError({ status: 404, message: err });
		}

		return data as DayAvailability[];
	}
	catch (error) {
		console.error("Get Availability Error:", error);
		return createError({ status: 500, message: "Internal Server Error" });
	}
});
