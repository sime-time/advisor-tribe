<script setup lang="ts">
import type { DayAvailability } from "~/db/queries/types";
import { getDayName, times, timeZones } from "~/lib/time";
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();
const timeZone = ref("");

// make useFetch reactive to authStore.user.id by making it a return function
const { data: schedule, pending } = await useFetch<DayAvailability[]>(() => `/api/availability/${authStore.user?.id}`, {
	lazy: true,
	// only fetch when user.id is available
	immediate: !!authStore.user?.id,
	// retrigger the fetch when the user.id changes
	watch: [() => authStore.user?.id],
});

const weekSchedule = reactive(schedule);
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

		<div v-if="pending || !schedule || !authStore.user">
			<LoadingSpinner />
		</div>

		<div v-else>
			<UForm :state="{ timeZone, weekSchedule }" class="flex flex-col gap-y-6">
				<!-- Timezone -->
				<UFormField label="Time zone">
					<USelectMenu v-model="timeZone" size="lg" :items="timeZones" placeholder="Select a time zone" />
				</UFormField>

				<!-- Weekly schedule -->
				<div
					v-for="day in weekSchedule"
					:key="day.weekDay"
					class="grid grid-cols-2 md:grid-cols-3 items-center gap-x-4 gap-y-2 min-h-8"
				>
					<div class="col-span-2 md:col-span-1">
						<USwitch v-model="day.isActive" :label="getDayName(day.weekDay)" />
					</div>

					<template v-if="day.isActive">
						<USelect
							v-model="day.startTime"
							:items="times"
							placeholder="From Time"
						/>
						<USelect
							v-model="day.endTime"
							:items="times"
							placeholder="End Time"
						/>
					</template>
				</div>
				<UButton type="submit" size="xl" block>
					Save Changes
				</UButton>
			</UForm>
		</div>
	</UCard>
</template>
