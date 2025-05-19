<script setup lang="ts">
import { z } from "zod";

const authStore = useAuthStore();
const toast = useToast();

const SignUpForm = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Please insert a valid email address"),
	password: z.string().min(8, "Password must contain at least 8 characters"),
	confirmPassword: z.string().min(8),
}).refine(data => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});

export type SignUpForm = z.infer<typeof SignUpForm>;

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const formError = ref("");

async function handleSignUp() {
	formError.value = "";

	// make sure the user input is valid before using it to create a new user
	try {
		const validSignUp = SignUpForm.parse({
			firstName: firstName.value.trim(),
			lastName: lastName.value.trim(),
			email: email.value,
			password: password.value,
			confirmPassword: confirmPassword.value,
		});

		const name = `${validSignUp.firstName} ${validSignUp.lastName}`;
		await authStore.signUp(name, validSignUp.email, validSignUp.password);
	}
	catch (err: any) {
		console.error("Auth Error", err);
		if (err instanceof z.ZodError) {
			formError.value = err.errors[0]?.message || "Invalid input";
		}
		else {
			formError.value = err?.message || "An error occurred";
		}
		return toast.add({
			title: "Sign Up Error",
			description: `${formError.value}`,
			icon: "i-lucide-triangle-alert",
			color: "error",
		});
	}
}
</script>

<template>
	<section
		class="flex justify-center items-center p-4 bg-white min-h-[754px]"
	>
		<article
			class="w-full max-w-md bg-white rounded-lg border border-solid border-slate-200 shadow-sm"
		>
			<header class="flex flex-col px-6 pt-6 text-center">
				<h3
					class="text-2xl font-bold tracking-tight leading-8 text-center"
				>
					Create an account
				</h3>
				<p class="mt-1.5 text-sm leading-5 text-center text-slate-500">
					Sign up to get started
				</p>
			</header>

			<main class="p-6">
				<form
					class="flex flex-col gap-4"
					@submit.prevent="handleSignUp"
				>
					<div class="flex flex-col gap-2">
						<label
							for="first-name"
							class="text-sm font-medium leading-4 cursor-default"
						>
							First Name
						</label>
						<UInput
							v-model="firstName"
							icon="i-lucide-user"
							variant="outline"
							placeholder="John"
							size="lg"
							required
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label
							for="last-name"
							class="text-sm font-medium leading-4 cursor-default"
						>
							Last Name
						</label>
						<UInput
							v-model="lastName"
							icon="i-lucide-user"
							variant="outline"
							placeholder="Smith"
							size="lg"
							required
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label
							for="email"
							class="text-sm font-medium leading-4 cursor-default"
						>
							Email
						</label>

						<UInput
							v-model="email"
							icon="i-lucide-mail"
							variant="outline"
							placeholder="Email"
							size="lg"
							required
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label
							for="password"
							class="text-sm font-medium leading-4 cursor-default"
						>
							Password
						</label>
						<UInput
							v-model="password"
							icon="i-lucide-lock"
							type="password"
							variant="outline"
							placeholder="Password"
							size="lg"
							required
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label
							for="confirmPassword"
							class="text-sm font-medium leading-4 cursor-default"
						>
							Confirm Password
						</label>
						<UInput
							v-model="confirmPassword"
							icon="i-lucide-lock"
							type="password"
							variant="outline"
							placeholder="Confirm password"
							size="lg"
							required
						/>
					</div>

					<p v-if="formError" class="text-error text-sm">
						{{ formError }}
					</p>

					<UButton
						type="submit"
						size="lg"
						class="w-full justify-center"
						:loading="authStore.loading"
						:disabled="authStore.loading"
					>
						Sign up
					</UButton>
				</form>

				<USeparator label="or continue with" class="my-6" />

				<GoogleButton class="w-full justify-center" />
			</main>

			<footer class="flex flex-col items-center px-6 pb-6 text-center">
				<p class="text-sm leading-5 text-center text-slate-500">
					<span>Already have an account? </span>
					<a
						href="/sign-in"
						class="text-sm leading-5 text-center underline cursor-pointer text-slate-500 underline-offset-4"
					>
						Sign in
					</a>
				</p>
			</footer>
		</article>
	</section>
</template>
