<script setup lang="ts">
import { hourStrings, timeZones } from "~/lib/time";

const timezone = ref(timeZones[0]);
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
		active: true,
		start: hourStrings[9],
		end: hourStrings[17],
		timezone,
	})),
);

function handleSubmit() {
	// post the entire week schedule object to api endpoint

}
</script>

<template>
	<UCard>
		<template #header>
			<header class="flex flex-col text-center">
				<h1 class="text-2xl font-bold tracking-tight leading-8">
					Set your availability
				</h1>
				<p class="mt-1.5 text-sm leading-5 text-neutral-500">
					Set what days and times users are able to book meetings with you.
				</p>
			</header>
		</template>
		<form @submit.prevent="handleSubmit">
			<!-- Timezone -->
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium leading-4">Timezone</label>
				<USelectMenu v-model="timezone" :items="timeZones" label="Timezone" />
			</div>

			<!-- Weekly schedule -->
			<div v-for="day in weekSchedule" :key="day.name">
				<div class="grid grid-cols-3 gap-6 justify-between items-center my-4 ">
					<USwitch v-model="day.active" :label="day.name" />
					<template v-if="day.active">
						<USelect
							v-model="day.start"
							:items="hourStrings"
						/>
						<USelect
							v-model="day.end"
							:items="hourStrings"
						/>
					</template>
				</div>
			</div>
			<UButton
				type="submit"
				size="lg"
				class="w-full justify-center mt-2"
			>
				Set Schedule
			</UButton>
		</form>
	</UCard>
</template>
