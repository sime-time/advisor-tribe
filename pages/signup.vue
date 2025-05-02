<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

function handleSubmit() {
	// Handle form submission logic here
	console.log("Form submitted", {
		name: name.value,
		email: email.value,
		password: password.value,
		confirmPassword: confirmPassword.value,
	});
}

function handleGoogleSignIn() {
	// Handle Google sign-in logic here
	console.log("Google sign-in clicked");
}
</script>

<template>
	<section class="flex justify-center items-center p-4 bg-white min-h-[754px]">
		<article
			class="w-full max-w-md bg-white rounded-lg border border-solid border-slate-200 shadow-md"
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
				<form @submit.prevent="handleSubmit">
					<div class="mb-4 flex flex-col gap-2">
						<label
							for="name"
							class="text-sm font-medium leading-4 cursor-default"
						>
							Name
						</label>
						<UInput
							v-model="name"
							icon="i-lucide-user"
							variant="outline"
							placeholder="Full name"
							size="lg"
						/>
					</div>

					<div class="mb-4 flex flex-col gap-2">
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
							placeholder="email"
							size="lg"
						/>
					</div>

					<div class="mb-4 flex flex-col gap-2">
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
							placeholder="password"
							size="lg"
						/>
					</div>

					<div class="mb-4 flex flex-col gap-2">
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
							placeholder="confirm password"
							size="lg"
						/>
					</div>

					<UButton
						type="submit"
						size="lg"
						class="w-full justify-center"
					>
						Sign up
					</UButton>
				</form>

				<Divider text="or continue with" class="my-6" />

				<SocialButton
					icon="google"
					text="Sign up with Google"
					@click="handleGoogleSignIn"
				/>
			</main>

			<footer class="flex flex-col items-center px-6 pb-6 text-center">
				<p class="text-sm leading-5 text-center text-slate-500">
					<span>Already have an account? </span>
					<a
						href="/signin"
						class="text-sm leading-5 text-center underline cursor-pointer text-slate-500 underline-offset-4"
					>
						Sign in
					</a>
				</p>
			</footer>
		</article>
	</section>
</template>
