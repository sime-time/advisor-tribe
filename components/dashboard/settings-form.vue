<script setup lang="ts">
import { z } from "zod"; // Import zod
import { hourStrings, timeZones } from "~/lib/time"; // Assuming these exist in your lib/time.ts
import { useAuthStore } from "~/stores/auth-store"; // Import auth store

const authStore = useAuthStore(); // Use auth store
const toast = useToast(); // Use toast composable

// Define Zod schemas for validation
const DaySchema = z.object({
	name: z.string(),
	active: z.boolean(),
	start: z.string(),
	end: z.string(),
});

const WeekScheduleSchema = z.array(DaySchema);
type WeekSchedule = z.infer<typeof WeekScheduleSchema>;

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

const isSaving = ref(false); // Loading state for saving

// Handle form submission
async function handleSubmit() {
	isSaving.value = true; // Set loading state

	try {
		// Get the current user ID
		const userId = authStore.user?.id;
		if (!userId) {
			throw new Error("User not authenticated.");
		}

		// Validate the week schedule data
		const validatedSchedule = WeekScheduleSchema.parse(weekSchedule);

		// Prepare the data to send to the API
		const dataToSend = {
			userId,
			timezone: timezone.value, // Include timezone
			schedule: validatedSchedule.map(day => ({
				...day,
				// Convert time strings to numbers if your backend expects that
				// This depends on your backend API requirements
				// start: hourStringToNumber.get(day.start),
				// end: hourStringToNumber.get(day.end),
			})),
		};

		// Send the validated data to the API endpoint
		await $fetch("/api/advisors/set-availability", {
			method: "POST",
			body: dataToSend,
		});

		// Show success toast
		toast.add({
			title: "Availability saved!",
			description: "Your weekly schedule has been updated.",
			icon: "i-lucide-check-circle",
			color: "success",
		});
	}
	catch (error: any) {
		console.error("Failed to save availability:", error);

		// Determine error message
		let errorMessage = "An unexpected error occurred.";
		if (error instanceof z.ZodError) {
			errorMessage = error.errors[0]?.message || "Invalid form data.";
		}
		else if (error.data?.message) {
			errorMessage = error.data.message; // Assuming API returns error message in data.message
		}
		else if (error.message) {
			errorMessage = error.message;
		}

		// Show error toast
		toast.add({
			title: "Failed to save availability",
			description: errorMessage,
			icon: "i-lucide-triangle-alert",
			color: "error",
		});
	}
	finally {
		isSaving.value = false; // Reset loading state
	}
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
				:loading="isSaving"
				:disabled="isSaving"
			>
				Save Availability
			</UButton>
		</UForm>
	</UCard>
</template>
