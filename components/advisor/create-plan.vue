<script setup lang="ts">
import { z } from "zod";

const props = defineProps<{
	advisorId: number;
}>();

// validation schema for plan creation
const PlanSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	features: z.array(z.string().min(2)),
	pricing: z.array(z.object({
		amount: z.number().min(0),
		frequency: z.string(),
	})),
});
type PlanSchema = z.infer<typeof PlanSchema>;

const planState = reactive({
	title: "",
	description: "",
	features: [""],
	pricing: [
		{
			amount: 0,
			frequency: "month",
		},
		{
			amount: 0,
			frequency: "year",
		},
	],
});

function addFeature() {
	planState.features.push("");
}

const isUploading = ref(false);
const toast = useToast();

async function onSubmit() {
	isUploading.value = true;

	try {
		// validate the user input
		const validPlan = PlanSchema.parse(planState);

		// send the validated data to api endpoint
		await $fetch("/api/plans/create", {
			method: "POST",
			body: {
				advisorId: props.advisorId,
				title: validPlan.title,
				description: validPlan.description,
				features: validPlan.features,
				pricing: validPlan.pricing,
			},
		});

		return toast.add({
			title: "Your new plan has been created!",
			color: "success",
		});
	}
	catch (err: any) {
		console.error("Plan Creation Error", err);
		let errorMessage: string;
		if (err instanceof z.ZodError) {
			errorMessage = err.errors[0]?.message || "Invalid input";
		}
		else {
			errorMessage = err?.message || "An error occurred";
		}
		return toast.add({
			title: "Failed to create new plan",
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
			<h1 class="text-3xl font-bold">
				Create New Plan
			</h1>
		</template>
		<UForm :state="planState" :schema="PlanSchema" class="space-y-3" @submit.prevent="onSubmit">
			<UFormField label="Plan Name">
				<UInput v-model="planState.title" placeholder="Name of your offer" />
			</UFormField>
			<UFormField label="Description">
				<UTextarea v-model="planState.description" placeholder="Enter a description of what you're offering" />
			</UFormField>
			<UFormField label="Offer list">
				<div class="space-y-2">
					<div v-for="(_, index) in planState.features" :key="index">
						<UInput
							v-model="planState.features[index]"
							placeholder="Example: 2 calls per month"
						/>
					</div>
					<UButton variant="ghost" @click="addFeature">
						<UIcon name="i-lucide-plus" />
						Add offering
					</UButton>
				</div>
			</UFormField>
			<UFormField label="Monthly Price">
				<UInputNumber
					v-model="planState.pricing[0].amount"
					:step="1"
					:format-options="{
						style: 'currency',
						currency: 'USD',
						currencyDisplay: 'symbol',
						currencySign: 'standard',
					}"
				/>
			</UFormField>

			<UFormField label="Yearly Price">
				<UInputNumber
					v-model="planState.pricing[1].amount"
					:step="1"
					:format-options="{
						style: 'currency',
						currency: 'USD',
						currencyDisplay: 'symbol',
						currencySign: 'accounting',
					}"
				/>
			</UFormField>
			<UButton type="submit" size="lg">
				Create New Plan
			</UButton>
		</UForm>
	</UCard>
</template>
