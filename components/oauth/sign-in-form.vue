<script setup lang="ts">
import { z } from "zod";

const toast = useToast();
const authStore = useAuthStore();

const SignInForm = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export type SignInForm = z.infer<typeof SignInForm>;

const email = ref("");
const password = ref("");
const formError = ref("");

async function handleSignIn() {
	formError.value = "";

	try {
	// make sure form input is valid before authenticating
		const validSignIn = SignInForm.parse({
			email: email.value,
			password: password.value,
		});

		await authStore.signIn(validSignIn.email, validSignIn.password);
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
			title: "Sign In Error",
			description: `${formError.value}`,
			icon: "i-lucide-triangle-alert",
			color: "error",
		});
	}
}
</script>

<template>
	<main class="flex justify-center items-center p-4 bg-white min-h-[754px]">
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

			<section class="p-6">
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

				<USeparator label="or continue with" class="my-6" />

				<OauthGoogleButton class="w-full justify-center" />
				<OauthMicrosoftButton class="w-full justify-center mt-3" />
				<OauthCalendlyButton class="w-full justify-center mt-3" />
			</section>

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
	</main>
</template>
