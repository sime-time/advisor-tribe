<script setup lang="ts">
import { createAuthClient } from "better-auth/vue";
import { z } from "zod";

const authClient = createAuthClient();
const session = await authClient.getSession();
const sessionUserId = computed(() => session.data?.user.id);
const sessionUserName = computed(() => session.data?.user.name);

const OnboardingForm = z.object({
	userId: z.number(),
	city: z.string().min(2).optional(),
	state: z.string().min(2).optional(),
	country: z.string().min(2).optional(),
	title: z.string().min(1).optional(),
	bio: z.string().min(10).optional(),
});

type OnboardingForm = z.infer<typeof OnboardingForm>;

const form = reactive({
	userId: sessionUserId,
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

async function handleSubmit() {
	formError.value = "";
	try {
		const validForm = OnboardingForm.parse(form);

		await router.push("/advisor/availability");
	}
	catch (err) {
		console.error("Onboarding Error", err);
		formError.value = "Invalid Input";

		return toast.add({
			title: "Failed to create advisor profile",
			description: `${formError.value}`,
			icon: "i-lucide-triangle-alert",
			color: "error",
		});
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
					Tell us more about yourself, {{ sessionUserName }}
				</p>
			</header>

			<main class="pt-6">
				<form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
					<div class="flex flex-col gap-2">
						<label class="text-sm font-medium leading-4">Career Title</label>
						<UInput
							v-model="form.title"
							icon="i-lucide-briefcase"
							variant="outline"
							placeholder="e.g. Financial Advisor"
							size="lg"
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label class="text-sm font-medium leading-4">Bio</label>
						<UTextarea
							v-model="form.bio"
							variant="outline"
							placeholder="Tell us about your experience..."
							size="lg"
							:rows="4"
						/>
					</div>

					<div class="flex gap-4">
						<div class="flex-1">
							<label class="text-sm font-medium leading-4">City</label>
							<UInput
								v-model="form.city"
								icon="i-lucide-map-pin"
								variant="outline"
								placeholder="City"
								size="lg"
							/>
						</div>
						<div class="flex-1">
							<label class="text-sm font-medium leading-4">State</label>
							<UInput
								v-model="form.state"
								variant="outline"
								placeholder="State"
								size="lg"
							/>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="flex-1">
							<label class="text-sm font-medium leading-4">Country</label>
							<UInput
								v-model="form.country"
								icon="i-lucide-globe"
								variant="outline"
								placeholder="Country"
								size="lg"
							/>
						</div>
						<div class="flex-1">
							<label class="text-sm font-medium leading-4">Postal Code</label>
							<UInput
								v-model="form.state"
								variant="outline"
								placeholder="Postal Code"
								size="lg"
							/>
						</div>
					</div>

					<p v-if="formError" class="text-error text-sm">
						{{ formError }}
					</p>

					<UButton
						type="submit"
						size="lg"
						class="w-full justify-center"
						:loading="isUploading"
						:disabled="isUploading"
					>
						Continue
					</UButton>
				</form>
			</main>
		</UCard>
	</main>
</template>
