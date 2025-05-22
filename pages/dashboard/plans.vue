<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

definePageMeta({
	layout: "dashboard-nav",
});

// const authStore = useAuthStore();
// const { data: advisorId } = await useFetch(`api/advisors/get-id/${authStore.user?.id}`);
// const { data: plans } = await useFetch(`/api/plans/${advisorId}`);
const plans = null;
</script>

<template>
	<main>
		<h1>My Plans</h1>
		<div>
			<AdvisorCreatePlan />
		</div>
		<div v-if="plans" class="container flex flex-col md:flex-row mx-auto gap-7 md:py-8">
			<template v-if="plans.length > 0">
				<USeparator label="or select a plan" />
				<template v-for="(plan, index) in plans" :key="index">
					<AdvisorPlan :plan="plan" />
				</template>
			</template>
		</div>
	</main>
</template>
