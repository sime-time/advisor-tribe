<script setup lang="ts">
import { type } from "arktype";

const authStore = useAuthStore();
const toast = useToast();

const SignUpForm = type({
	firstName: "string > 0",
	lastName: "string > 0",
	email: "string.email",
	password: "string >= 8",
	confirmPassword: "string >= 8",

}).narrow((data, context) => {
	if (data.password === data.confirmPassword) {
		return true;
	}
	return context.reject({
		expected: "identical to password",
		actual: "", // don't display the actual password
		path: ["confirmPassword"],
	});
});

export type SignUpForm = typeof SignUpForm.infer;

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const formError = ref("");

async function handleSignUp() {
	formError.value = "";

	// make sure the user input is valid before using it to create a new user
	const validSignUp = SignUpForm({
		firstName: firstName.value.trim(),
		lastName: lastName.value.trim(),
		email: email.value,
		password: password.value,
		confirmPassword: confirmPassword.value,
	});

	if (validSignUp instanceof type.errors) {
		formError.value = validSignUp.summary;
		return toast.add({
			title: "Sign Up Error",
			description: `${formError.value}`,
			icon: "i-lucide-triangle-alert",
			color: "error",
		});
	}

	try {
		const name = `${validSignUp.firstName} ${validSignUp.lastName}`;
		await authStore.signUp(name, validSignUp.email, validSignUp.password);
	}
	catch (err) {
		console.error("Auth Error", err);
	}
}
</script>

<template>
	<section class="flex justify-center items-center p-4 bg-white min-h-[754px]">
		<article
			class="w-full max-w-md bg-white rounded-lg border border-solid border-slate-200 shadow-sm"
		>
			<header class="flex flex-col px-6 pt-6 text-center">
				<h3 class="text-2xl font-bold tracking-tight leading-8 text-center">
					Create an account
				</h3>
				<p class="mt-1.5 text-sm leading-5 text-center text-slate-500">
					Sign up to get started
				</p>
			</header>

			<main class="p-6">
				<form class="flex flex-col gap-4" @submit.prevent="handleSignUp">
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
