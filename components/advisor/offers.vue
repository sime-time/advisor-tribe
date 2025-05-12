<script setup lang="ts">
import type { AdvisorPlan } from "~/db/queries/types";

const plans: AdvisorPlan[] = [
	{
		title: "1-on-1 Business Mentoring",
		features: [
			"1:1 Chat Messaging (Unlimited)",
			"1 video call per month",
			"Real world advice on retail managing multiple locations",
			"Lessons on branding, narrative, local marketing, delightful customer service, hiring, and more",
			"How to launch and grow a successful product line",
		],
		price: {
			month: 900,
			year: 7500,
		},
	},
	{
		title: "Growing a successful online business",
		features: [
			"1:1 Chat Messaging (Unlimited)",
			"2 video calls per month",
			"Tips on building a $10M/$100M+ business",
			"Lessons on growth, fundraising, product, launching",
			"How market online with user-generated content",
			"How to validate your product fast and free online",
		],
		price: {
			month: 1800,
			year: 17000,
		},
	},
];
</script>

<template>
	<UCard>
		<div class="flex flex-col gap-6">
			<AdvisorBookCall />
			<USeparator label="or select a plan" />
			<div v-for="(plan, index) in plans" :key="index">
				<AdvisorPlan :plan="plan" />
			</div>
		</div>
	</UCard>
</template>
