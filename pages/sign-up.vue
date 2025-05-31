<template>
	<main class="flex justify-center items-center min-h-[500px]">
		<UCard class="w-fit">
			<template #header>
				<h1 class="text-2xl font-bold tracking-tight leading-8 text-center">
					Create an account
				</h1>
				<p class="mt-1.5 text-sm leading-5 text-center text-slate-500">
					Sign up to get started
				</p>
			</template>

			<OauthGoogleButton class="w-full justify-center" />
			<OauthMicrosoftButton class="w-full justify-center mt3" />

			<template #footer>
				<p class="text-sm leading-5 text-center text-slate-500">
					<span>Already have an account? </span>
					<a
						href="/sign-in"
						class="text-sm leading-5 text-center underline cursor-pointer text-slate-500 underline-offset-4"
					>
						Sign in
					</a>
				</p>
			</template>
		</UCard>
	</main>
</template>
