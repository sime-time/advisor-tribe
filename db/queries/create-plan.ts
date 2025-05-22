import type { NewPlan } from "./types";
import db from "../index";
import { plan, planFeature, planPricing } from "../schema/index";

export async function createPlan(newPlan: NewPlan) {
	try {
		// insert the advisor's plan and use the id after inserting
		const insertedPlan = await db.insert(plan).values({
			advisorId: newPlan.advisorId,
			title: newPlan.title,
			description: newPlan.description,
		}).returning({ id: plan.id });

		const planId = insertedPlan[0].id;

		// add all the features to the plan
		for (let i = 0; i < newPlan.features.length; i++) {
			const feature = newPlan.features[i];
			await db.insert(planFeature).values({
				planId,
				text: feature,
			});
		}

		// add the pricing options of the plan
		for (let i = 0; i < newPlan.pricing.length; i++) {
			const priceOption = newPlan.pricing[i];
			await db.insert(planPricing).values({
				planId,
				frequency: priceOption.frequency,
				amount: priceOption.amount,
			});
		}
	}
	catch (error) {
		console.error("Plan creation failed:", error);
	}
}
