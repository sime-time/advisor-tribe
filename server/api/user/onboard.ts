import { z } from "zod";
import { createAvailability } from "~/db/queries/create-availability";
import { updateUser } from "~/db/queries/update-user";

const UserSchema = z.object({
	id: z.number(),
	name: z.string().min(2, "Full name is required"),
	linkName: z
		.string()
		.min(3, "Link name must have at least 3 characters")
		.max(150)
		.regex(/^[a-z0-9-]+$/i, "Link name can only contain letters, numbers, and -"),
});

export default defineEventHandler(async (event) => {
	const formData = await readFormData(event);

	try {
		// Validate form data
		const validUser = UserSchema.parse({
			id: Number(formData.get("id")),
			name: formData.get("name"),
			linkName: formData.get("linkName"),
		});

		// Update user with valid onboarding data
		const data = await updateUser(validUser);

		// Also add default availability to this user
		await createAvailability(validUser.id);

		return data;
	}
	catch (error) {
		console.error(error);
		// return any validation error
		if (error instanceof z.ZodError) {
			throw createError({
				statusCode: 400,
				message: error.errors[0].message,
			});
		}
		throw createError({
			statusCode: 500,
			message: "Failed to onboard user",
		});
	}
});
