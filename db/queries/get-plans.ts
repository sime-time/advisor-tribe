import type { AdvisorPlan } from "./types";
import { eq } from "drizzle-orm";
import db from "../index";
import { plan, planFeature, planPricing } from "../schema/index";

// helper function to convert integer prices (lowest monetary unit) into readable strings
function formatPrice(amount: number) {
	const price = amount / 100;
	const formatted = price.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
	// take out the last ".00" if there are no cents
	return formatted.endsWith(".00") ? formatted.slice(0, -3) : formatted;
}

export async function getAdvisorPlans(advisorId: number) {
	const plans = await db.select().from(plan).where(eq(plan.advisorId, advisorId));
	if (!plans) {
		return null;
	}
	// for each plan, get the list of features and pricing
	// use Promise.all to wait for all async operations to complete
	const result = await Promise.all(plans.map(async (plan) => {
		const features = await getPlanFeatures(plan.id);
		const featureList: string[] = features.map(feat => feat.text);

		const prices = await getPlanPricing(plan.id);
		const billing = prices.map((price) => {
			return {
				frequency: price.frequency,
				price: formatPrice(price.amount),
			};
		});

		// then create an AdvisorPlan object
		return {
			title: plan.title,
			description: plan.description,
			features: featureList,
			billing,
		} as AdvisorPlan;
	}));

	// return a list of AdvisorPlans
	return result;
}

export async function getPlanFeatures(planId: number) {
	const features = await db.select().from(planFeature).where(eq(planFeature.planId, planId));
	return features;
}

export async function getPlanPricing(planId: number) {
	const frequencies = await db.select().from(planPricing).where(eq(planPricing.planId, planId));
	return frequencies;
}
