import type { NewAdvisor } from "~/db/queries/types";
import { z } from "zod";
import { createAdvisor } from "~/db/queries/create-advisor";

// Define validation schema
const AdvisorSchema = z.object({
	userId: z.number(),
	title: z.string().min(1, "Title is required"),
	bio: z.string().min(1, "Bio is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	country: z.string().min(1, "Country is required"),
	postalCode: z.string().min(1, "Postal code is required"),
});

export default defineEventHandler(async (event) => {
	const formData = await readFormData(event);

	try {
		// Validate form data
		const validatedData = AdvisorSchema.parse({
			userId: Number(formData.get("userId")),
			title: formData.get("title"),
			bio: formData.get("bio"),
			city: formData.get("city"),
			state: formData.get("state"),
			country: formData.get("country"),
			postalCode: formData.get("postalCode"),
		});

		// Create advisor with validated data
		const data = await createAdvisor(validatedData);
		console.log("return data", data);
		return data;
	}
	catch (error) {
		if (error instanceof z.ZodError) {
			throw createError({
				statusCode: 400,
				message: error.errors[0].message,
			});
		}
		console.error(error);
		throw createError({
			statusCode: 500,
			message: "Failed to create advisor",
		});
	}
});
