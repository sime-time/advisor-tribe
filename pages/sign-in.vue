<script setup lang="ts">
import { type } from "arktype";

const toast = useToast();
const authStore = useAuthStore();

const SignInForm = type({
	email: "string.email",
	password: "string >= 8",
});

export type SignInForm = typeof SignInForm.infer;

const email = ref("");
const password = ref("");
const formError = ref("");

async function handleSignIn() {
	formError.value = "";

	// make sure form input is valid before authenticating
	const validSignIn = SignInForm({
		email: email.value,
		password: password.value,
	});

	if (validSignIn instanceof type.errors) {
		formError.value = validSignIn.summary;
		// stop function here if form input is invalid
		return toast.add({
			title: "Sign In Error",
			description: `${formError.value}`,
			icon: "i-lucide-triangle-alert",
			color: "error",
		});
	}

	try {
		await authStore.signIn(validSignIn.email, validSignIn.password);
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
					Welcome back
				</h3>
				<p class="mt-1.5 text-sm leading-5 text-center text-slate-500">
					Sign in to your account to continue
				</p>
			</header>

			<main class="p-6">
				<form class="flex flex-col gap-4" @submit.prevent="handleSignIn">
					<div class="flex flex-col gap-2">
						<label
							for="email"
							class="text-sm font-medium leading-4 cursor-default"
						>
							Email
						</label>
						<UInput v-model="email" icon="i-lucide-mail" type="email" variant="outline" placeholder="Email" size="lg" required />
					</div>

					<div class="flex flex-col gap-2">
						<label
							for="password"
							class="text-sm font-medium leading-4 cursor-default"
						>
							Password
						</label>
						<UInput v-model="password" icon="i-lucide-lock" type="password" variant="outline" placeholder="Password" size="lg" required />
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
						Sign in
					</UButton>
				</form>

				<Divider text="or continue with" class="my-6" />

				<GoogleButton class="w-full justify-center" />
			</main>

			<footer class="flex flex-col items-center px-6 pb-6 text-center">
				<p class="text-sm leading-5 text-center text-slate-500">
					<span>Don't have an account? </span>
					<a
						href="/sign-up"
						class="text-sm leading-5 text-center underline cursor-pointer text-slate-500 underline-offset-4"
					>
						Sign up
					</a>
				</p>
			</footer>
		</article>
	</section>
</template>
