<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const showPassword = ref(false);

function togglePasswordVisibility() {
	showPassword.value = !showPassword.value;
}

function handleSubmit() {
	// Handle form submission logic here
	console.log("Form submitted", {
		email: email.value,
		password: password.value,
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
					Welcome back
				</h3>
				<p class="mt-1.5 text-sm leading-5 text-center text-slate-500">
					Sign in to your account to continue
				</p>
			</header>

			<main class="p-6">
				<form @submit.prevent="handleSubmit">
					<div class="mb-4 flex flex-col gap-2">
						<label
							for="email"
							class="text-sm font-medium leading-4 cursor-default"
						>
							Email
						</label>
						<UInput icon="i-lucide-mail" variant="outline" placeholder="email" size="lg" />
					</div>

					<div class="mb-4 flex flex-col gap-2">
						<label
							for="password"
							class="text-sm font-medium leading-4 cursor-default"
						>
							Password
						</label>
						<UInput icon="i-lucide-lock" type="password" variant="outline" placeholder="password" size="lg" />
					</div>

					<UButton
						type="submit"
						size="lg"
						class="w-full justify-center"
					>
						Sign in
					</UButton>
				</form>

				<Divider text="or continue with" class="my-6" />

				<SocialButton
					icon="google"
					text="Sign in with Google"
					@click="handleGoogleSignIn"
				/>
			</main>

			<footer class="flex flex-col items-center px-6 pb-6 text-center">
				<p class="text-sm leading-5 text-center text-slate-500">
					<span>Don't have an account? </span>
					<a
						href="/signup"
						class="text-sm leading-5 text-center underline cursor-pointer text-slate-500 underline-offset-4"
					>
						Sign up
					</a>
				</p>
			</footer>
		</article>
	</section>
</template>
