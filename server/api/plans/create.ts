import { z } from "zod";
import { createPlan } from "~/db/queries/create-plan";

const PlanSchema = z.object({
	advisorId: z.number(),
	title: z.string(),
	description: z.string(),
	features: z.array(z.string()),
	pricing: z.array(z.object({
		amount: z.number(),
		frequency: z.string(),
	})),
});
type PlanSchema = z.infer<typeof PlanSchema>;

export default defineEventHandler(async (event) => {
	const formData = await readFormData(event);

	try {
		// validate form data
		const validatedData = PlanSchema.parse({
			advisorId: Number(formData.get("advisorId")),
			title: formData.get("title"),
			description: formData.get("description"),
			features: formData.get("features"),
			pricing: formData.get("pricing"),
		});

		// create a plan with validated data
		const data = await createPlan(validatedData);
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
			message: "Failed to create plan",
		});
	}
});
