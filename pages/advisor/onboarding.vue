<script setup lang="ts">
import { z } from "zod";
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore(); // for userId

const OnboardSchema = z.object({
	title: z.string().min(2, "A career title is required"),
	bio: z.string().min(10, "Provide more information in your bio"),
	city: z.string().min(2, "You need to input your city"),
	state: z.string().min(2, "You need to input a state"),
	country: z.string().min(2, "You need to input your country"),
	postalCode: z.string().min(4, "You must provide your postal code"),
});

type OnboardSchema = z.infer<typeof OnboardSchema>;

const onboardForm = reactive({
	title: "",
	bio: "",
	city: "",
	state: "",
	country: "",
	postalCode: "",
});

const formError = ref("");
const isUploading = ref(false);
const router = useRouter();
const toast = useToast();

async function onSubmit() {
	formError.value = "";
	isUploading.value = true;
	try {
		const validForm = OnboardSchema.parse(onboardForm);

		// loop through the entries in the validForm to make a FormData object
		// this FormData will be sent to the api for creating a new advisor
		const formData = new FormData();
		Object.entries(validForm).forEach(([key, value]) => {
			formData.append(key, value);
		});
		// also need to send the current user's id to create the advisor
		formData.append("userId", `${authStore.user?.id}`);

		// send FormData payload to api endpoint
		await $fetch("/api/advisors/create", {
			method: "POST",
			body: formData,
		});

		toast.add({
			title: "You are now an advisor!",
			color: "success",
		});

		return await router.push("/advisor/available");
	}
	catch (err: any) {
		console.error("Onboarding Error", err);
		if (err instanceof z.ZodError) {
			formError.value = err.errors[0]?.message || "Invalid input";
		}
		else {
			formError.value = err?.message || "An error occurred";
		}
		return toast.add({
			title: "Failed to create advisor profile",
			description: `${formError.value}`,
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
	<main class="flex justify-center items-center p-4 bg-white min-h-[754px]">
		<UCard class="w-full max-w-md bg-white rounded-lg border border-solid border-slate-200 shadow-sm">
			<header class="flex flex-col  text-center">
				<h1 class="text-2xl font-bold tracking-tight leading-8">
					Create Your Advisor Profile
				</h1>
				<p class="mt-1.5 text-sm leading-5 text-slate-500">
					Tell us more about yourself
				</p>
			</header>

			<main class="pt-6">
				<UForm :schema="OnboardSchema" :state="onboardForm" class="flex flex-col gap-4" @submit.prevent="onSubmit">
					<UFormField label="Career Title" name="title">
						<UInput
							v-model="onboardForm.title"
							icon="i-lucide-briefcase"
							variant="outline"
							placeholder="e.g. Financial Advisor"
							class="w-full"
							size="lg"
							:disabled="isUploading"
						/>
					</UFormField>

					<UFormField label="Bio" name="bio">
						<UTextarea
							v-model="onboardForm.bio"
							variant="outline"
							placeholder="Tell us about your experience..."
							size="lg"
							class="w-full"
							:rows="4"
							:disabled="isUploading"
						/>
					</UFormField>

					<div class="grid grid-cols-2 gap-4 ">
						<UFormField label="City" name="city">
							<UInput
								v-model="onboardForm.city"
								icon="i-lucide-map-pin"
								variant="outline"
								placeholder="City"
								class="w-full"
								size="lg"
								:disabled="isUploading"
							/>
						</UFormField>
						<UFormField label="State" name="state">
							<UInput
								v-model="onboardForm.state"
								variant="outline"
								placeholder="State"
								class="w-full"
								size="lg"
								:disabled="isUploading"
							/>
						</UFormField>
					</div>
					<div class="grid grid-cols-2 gap-4">
						<UFormField label="Country" name="country">
							<UInput
								v-model="onboardForm.country"
								icon="i-lucide-globe"
								variant="outline"
								placeholder="Country"
								class="w-full"
								size="lg"
								:disabled="isUploading"
							/>
						</UFormField>
						<UFormField label="Postal Code" name="postalCode">
							<UInput
								v-model="onboardForm.postalCode"
								variant="outline"
								placeholder="Postal Code"
								class="w-full"
								size="lg"
								:disabled="isUploading"
							/>
						</UFormField>
					</div>

					<UButton
						type="submit"
						size="lg"
						class="w-full justify-center"
						:loading="isUploading"
						:disabled="isUploading"
					>
						Continue
					</UButton>
				</UForm>
			</main>
		</UCard>
	</main>
</template>
