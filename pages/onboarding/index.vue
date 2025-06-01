<script setup lang="ts">
import { z } from "zod";
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore(); // for user's id

const OnboardSchema = z.object({
	firstName: z.string().min(2, "Your first name is required"),
	lastName: z.string().min(2, "Your last name is required"),
	linkName: z
		.string()
		.min(3, "Link name must have at least 3 characters")
		.max(150)
		.regex(/^[a-z0-9-]+$/i, "Link name can only contain letters, numbers, and - (dash)"),
});
type OnboardSchema = z.infer<typeof OnboardSchema>;

const formState = reactive({
	firstName: "",
	lastName: "",
	linkName: "",
});

const name = computed(() => {
	return `${formState.firstName.trim()} ${formState.lastName.trim()}`;
});

const formError = ref("");
const isUploading = ref(false);
const router = useRouter();
const toast = useToast();

async function onSubmit() {
	formError.value = "";
	isUploading.value = true;
	try {
		const validForm = OnboardSchema.parse(formState);

		// this FormData will be sent to the api
		const formData = new FormData();
		formData.append("id", `${authStore.user?.id}`);
		formData.append("name", name.value);
		formData.append("linkName", validForm.linkName);

		// send FormData payload to api endpoint
		await $fetch("/api/onboard-user", {
			method: "POST",
			body: formData,
		});

		toast.add({
			title: "Onboarding complete!",
			color: "success",
		});

		return await router.push("/dashboard");
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
			title: "Failed to onboard user",
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
	<div class="h-screen flex justify-center items-start px-1">
		<UCard class="mt-20">
			<template #header>
				<h1 class="text-3xl font-bold">
					Welcome to Advisor<span class="text-primary-600">Tribe</span>
				</h1>
				<p class="text-neutral-500 text-base">
					We need the following information to set up your profile.
				</p>
			</template>

			<UForm :state="formState" :schema="OnboardSchema" class="grid gap-y-5" @submit.prevent="onSubmit">
				<div class="flex gap-5">
					<UFormField label="First Name" name="firstName">
						<UInput v-model="formState.firstName" size="lg" class="w-full" />
					</UFormField>
					<UFormField label="Last Name" name="lastName">
						<UInput v-model="formState.lastName" size="lg" class="w-full" />
					</UFormField>
				</div>
				<UFormField label="Share link" name="linkName">
					<UButtonGroup size="lg" class="flex">
						<UButton color="neutral" variant="subtle" as="label" class="cursor-default w-fit text-neutral-500 text-nowrap">
							https://advisor-tribe.com/
						</UButton>
						<UInput v-model="formState.linkName" class="flex-grow" :placeholder="`${formState.firstName}-${formState.lastName}`" />
					</UButtonGroup>
				</UFormField>
				<UButton
					type="submit"
					size="lg"
					:loading="isUploading"
					:disabled="isUploading"
					class="flex justify-center mt-2"
				>
					Continue
				</UButton>
			</UForm>
		</UCard>
	</div>
</template>
