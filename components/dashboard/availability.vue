<script setup lang="ts">
import { hourStrings, timeZones } from "~/lib/time"; // Assuming these exist in your lib/time.ts

// Define the initial state for the weekly schedule
const timezone = ref(timeZones[0]); // Default to the first timezone
const weekSchedule = reactive(
	[
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	].map(day => ({
		name: day,
		active: true, // Default to active
		start: hourStrings[9], // Default start time (e.g., 9:00 AM)
		end: hourStrings[17], // Default end time (e.g., 5:00 PM)
	})),
);

// Placeholder for form submission (no backend logic yet)
function handleSubmit() {
	console.log("Form submitted:", {
		timezone: timezone.value,
		schedule: weekSchedule,
	});
	// No backend logic here as requested
}
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

		<UForm :state="{ timezone, weekSchedule }" class="space-y-6" @submit.prevent="handleSubmit">
			<!-- Timezone -->
			<UFormField label="Timezone">
				<USelectMenu v-model="timezone" :items="timeZones" placeholder="Select a timezone" />
			</UFormField>

			<!-- Weekly schedule -->
			<div class="space-y-4">
				<div v-for="(day) in weekSchedule" :key="day.name" class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center min-h-9">
					<div class="col-span-2 md:col-span-1">
						<USwitch v-model="day.active" :label="day.name" class="flex items-center" />
					</div>

					<template v-if="day.active">
						<USelect
							v-model="day.start"
							:items="hourStrings"
							placeholder="Start time"
							class=""
						/>
						<USelect
							v-model="day.end"
							:items="hourStrings"
							placeholder="End time"
						/>
					</template>
				</div>
			</div>

			<UButton
				type="submit"
				size="lg"
				class="w-full justify-center"
			>
				Save Availability
			</UButton>
		</UForm>
	</UCard>
</template>

<style scoped>
/* Add any specific styles here if needed */
</style>
