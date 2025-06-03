import { getAvailability } from "~/db/queries/get-availability";

export default defineEventHandler(async (event) => {
	const userId = Number.parseInt(event.context.params?.userId ?? "");
	if (!userId) {
		return createError({ status: 400, message: "Invalid or missing user id" });
	}

	try {
		// fetch the availability of this user
		const data = await getAvailability(userId);

		if (data.length === 0) {
			return createError({ status: 404, message: "Availability Not Found" });
		}

		return data;
	}
	catch (error) {
		console.error("Get Availability Error:", error);
		return createError({ status: 500, message: "Internal Server Error" });
	}
});
