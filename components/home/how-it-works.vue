<script setup lang="ts">
import type { ProcessStep as ProcessStepType } from "./types";
import { ref } from "vue";

const steps = ref<ProcessStepType[]>([
	{
		step: 1,
		title: "Discover advisors",
		description:
      "Browse through our curated list of mentors, experts, and advisors across different fields.",
		icon: "search",
		iconColor: "text-blue-600",
	},
	{
		step: 2,
		title: "Build your tribe",
		description:
      "Add advisors to your personal board based on your needs, goals, and challenges.",
		icon: "puzzle",
		iconColor: "text-red-400",
	},
	{
		step: 3,
		title: "Connect & grow",
		description:
      "Schedule sessions, ask questions, and get personalized guidance from your tribe.",
		icon: "sprout",
		iconColor: "text-green-600",
	},
	{
		step: 4,
		title: "Achieve your goals",
		description:
      "Leverage collective wisdom to overcome obstacles and reach your full potential.",
		icon: "trophy",
		iconColor: "text-yellow-500",
		isLast: true,
	},
]);
</script>

<template>
	<section
		id="how-it-works"
		class="py-16 bg-[linear-gradient(rgb(255,255,255),rgba(241,245,249,0.3))]"
	>
		<div class="px-4 mx-auto w-full max-w-[1400px] max-md:max-w-none">
			<div class="mx-auto mb-16 max-w-screen-md text-center">
				<h2 class="mb-3 text-3xl font-bold leading-9 text-center">
					How Advisor Tribe Works
				</h2>
				<p
					class="text-lg leading-7 text-center decoration-slate-500 outline-slate-500 text-slate-500"
				>
					Your journey to building a powerful personal board of advisors is
					simple
				</p>
			</div>
			<div class="grid gap-8 mb-12 md:grid-cols-4">
				<HomeProcessStep v-for="step in steps" :key="step.step" :step="step" />
			</div>
		</div>
	</section>
</template>
