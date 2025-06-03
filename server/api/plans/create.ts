import { z } from "zod";
import { createPlan } from "~/db/queries/create/create-plan";

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
	try {
		// get request body
		const body = await readBody<PlanSchema>(event);

		// multiply the pricing amount by 100 to fit the data
		body.pricing = body.pricing.map((price) => {
			const validAmount = price.amount * 100;
			return { ...price, amount: validAmount };
		});

		// create a plan with validated data
		const data = await createPlan(body);

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
