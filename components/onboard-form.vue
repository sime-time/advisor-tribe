<script setup lang="ts">
import { z } from "zod";

const authStore = useAuthStore();
const router = useRouter();

const OnboardingForm = z.object({
	isAdvisor: z.boolean(),
	city: z.string().min(2),
	state: z.string().min(2),
	country: z.string().min(2),
	title: z.string().min(1).optional(),
	bio: z.string().min(10).optional(),
});

type OnboardingForm = z.infer<typeof OnboardingForm>;

const form = reactive({
	isAdvisor: false,
	city: "",
	state: "",
	country: "",
	title: "",
	bio: "",
	image: null as File | null | URL,
});

const formError = ref("");
const isUploading = ref(false);

const fileInputRef = ref<HTMLInputElement | null>(null);

const imageUrl = computed(() =>
	form.image && form.image instanceof File
		? URL.createObjectURL(form.image)
		: "",
);

async function handleImageUpload(event: Event) {
	const input = event.target as HTMLInputElement;
	if (input.files?.length) {
		form.image = input.files[0];
	}
}

async function uploadAvatar(file: File) {
	try {
		const formData = new FormData();
		formData.append("image", file);

		const response = await fetch("/api/upload-avatar", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Upload failed");
		}

		const { url } = await response.json();
		return url;
	}
	catch (error) {
		console.error("Upload error:", error);
		throw error;
	}
}

async function handleSubmit() {
	formError.value = "";

	try {
		const validForm = OnboardingForm.parse({
			isAdvisor: form.isAdvisor,
			city: form.city,
			state: form.state,
			country: form.country,
			title: form.title,
			bio: form.bio,
		});

		// upload image to user entry
		let imageUrl = null;
		if (form.image instanceof File) {
			imageUrl = await uploadAvatar(form.image);
		}

		// Update user with image URL
		await $fetch("/api/upload-avatar", {
			method: "PATCH",
			body: {
				image: imageUrl,
			},
		});

		if (form.isAdvisor) {
			// Insert data into advisor table via api route

			// Redirect to advisor dashboard
			await router.push("/advisor/dashboard");
		}
		else {
			// Redirect to regular user dashboard
			await router.push("/dashboard");
		}
	}
	catch (err) {
		console.error("Onboarding Error", err);
		formError.value = "Failed to complete onboarding";
	}
}
</script>

<template>
	<UCard class="w-full max-w-md bg-white rounded-lg border border-solid border-slate-200 shadow-sm">
		<header class="flex flex-col  text-center">
			<h3 class="text-2xl font-bold tracking-tight leading-8">
				Complete Your Profile
			</h3>
			<p class="mt-1.5 text-sm leading-5 text-slate-500">
				Tell us more about yourself
			</p>
		</header>

		<main class="pt-6">
			<form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
				<div class="flex flex-col gap-4 items-center">
					<UAvatar
						:src="form.image ? imageUrl : ''"
						size="3xl"
					/>
					<UButton size="sm" @click="fileInputRef?.click()">
						Upload Photo
					</UButton>
					<input
						ref="fileInputRef"
						type="file"
						class="hidden"
						accept="image/*"
						@change="handleImageUpload"
					>
				</div>

				<USeparator />

				<div class="flex items-center gap-2">
					<USwitch v-model="form.isAdvisor" />
					<label class="text-sm font-medium">I want to be an advisor</label>
				</div>

				<template v-if="form.isAdvisor">
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

					<div class="flex flex-col gap-2">
						<label class="text-sm font-medium leading-4">Country</label>
						<UInput
							v-model="form.country"
							icon="i-lucide-globe"
							variant="outline"
							placeholder="Country"
							size="lg"
							required
						/>
					</div>
				</template>
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
</template>
