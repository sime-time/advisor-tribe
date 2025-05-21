<script setup lang="ts">
import { z } from "zod";
import { hourStrings, timeZones } from "~/lib/time";
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore(); // for userId
const isUploading = ref(false);
const router = useRouter();
const toast = useToast();

const DaySchema = z.object({
	name: z.string(),
	active: z.boolean(),
	start: z.string(),
	end: z.string(),
	timezone: z.string(),
});
const WeekSchema = z.array(DaySchema);
type WeekSchema = z.infer<typeof WeekSchema>;

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

async function handleSubmit() {
	isUploading.value = true;

	try {
		const userId = authStore.userId;
		if (!userId) {
			throw new Error("User not logged in");
		}

		// validate the data before sending
		const validSchedule = WeekSchema.parse(weekSchedule);
		console.log("valid:", validSchedule);

		// send the validated data to api endpoint
		await $fetch("/api/advisors/set-availability", {
			method: "POST",
			body: {
				userId,
				schedule: validSchedule,
			},
		});

		toast.add({
			title: "Your availability has been updated!",
			color: "success",
		});

		return await router.push("/dashboard");
	}
	catch (err: any) {
		console.error("Scheduling Error", err);
		let errorMessage: string;
		if (err instanceof z.ZodError) {
			errorMessage = err.errors[0]?.message || "Invalid input";
		}
		else {
			errorMessage = err?.message || "An error occurred";
		}
		return toast.add({
			title: "Failed to update availability",
			description: errorMessage,
			icon: "i-lucide-triangle-alert",
			color: "error",
		});
	}
	finally {
		isUploading.value = false;
	}
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
					Set what time and day users are able to book meetings with you.
				</p>
			</header>
		</template>
		<form @submit.prevent="handleSubmit">
			<!-- Timezone -->
			<div class="flex flex-col gap-2 mb-2">
				<label class="text-sm font-medium leading-4">Timezone</label>
				<USelectMenu v-model="timezone" :items="timeZones" label="Timezone" />
			</div>

			<!-- Weekly schedule -->
			<div v-for="day in weekSchedule" :key="day.name">
				<div class="grid grid-cols-3 gap-1 md:gap-6 justify-between items-center h-12">
					<USwitch v-model="day.active" :label="day.name" class="flex flex-col sm:flex-row" />
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
				class="w-full justify-center mt-4"
				:loading="isUploading"
				:disabled="isUploading"
			>
				Set Schedule
			</UButton>
		</form>
	</UCard>
</template>
