<script setup lang="ts">
import type { AdvisorPlan } from "~/db/queries/types";

defineProps<{
	plan: AdvisorPlan;
}>();
</script>

<template>
	<UCard variant="subtle" color="neutral">
		<template #header>
			<h2 class="font-bold text-xl">
				{{ plan.title }}
			</h2>
		</template>
		<div class="flex flex-col gap-5">
			<div class="flex flex-col gap-2">
				<p class="text-lg font-semibold">
					What's included:
				</p>
				<ul v-for="(feature, index) in plan.features" :key="index">
					<li class="flex items-start gap-2">
						<UIcon name="lucide:circle-check" class="mt-1" />
						<span class="w-fit">{{ feature }}</span>
					</li>
				</ul>
			</div>

			<div class="flex flex-wrap gap-4 ">
				<UBadge class="font-semibold text-base" variant="soft" size="lg">
					${{ plan.price.month }} / Month
				</UBadge>
				<UBadge v-if="plan.price.year" class="font-semibold text-base" variant="soft" size="lg">
					${{ plan.price.year }} / Year
				</UBadge>
			</div>
			<UButton size="xl" class="w-full justify-center">
				Select
			</UButton>
		</div>
	</UCard>
</template>
