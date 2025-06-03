<script setup lang="ts">
import type { DayAvailability } from "~/db/queries/types";
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();

// make useFetch reactive to authStore.user.id by adding a condition
const { data: schedule, pending } = await useFetch<DayAvailability[]>(`/api/availability/${authStore.user?.id}`, {
	lazy: true,
	// only fetch when user.id is available
	immediate: !!authStore.user?.id,
	// retrigger the fetch when the user.id changes
	watch: [() => authStore.user?.id],
});
</script>

<template>
	<UCard>
		<template #header>
			<header class="flex flex-col">
				<h1 class="text-3xl font-bold ">
					Set your availability
				</h1>
				<p class="mt-1 text-base text-neutral-500">
					Set what time and day users are able to book meetings with you.
				</p>
			</header>
		</template>

		<div v-if="pending || !schedule">
			<LoadingSpinner />
		</div>

		<div v-else>
			<div v-for="item in schedule" :key="item.weekDay">
				{{ item.weekDay }}
			</div>
		</div>
	</UCard>
</template>
