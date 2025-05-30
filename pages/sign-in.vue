<template>
	<main class="flex justify-center items-center min-h-[500px]">
		<UCard class="w-fit">
			<template #header>
				<h1 class="text-2xl font-bold tracking-tight leading-8 text-center">
					Welcome back
				</h1>
				<p class="mt-1.5 text-sm leading-5 text-center text-slate-500">
					Sign in to your account to continue
				</p>
			</template>

			<OauthCalendlyButton class="w-full justify-center" />

			<template #footer>
				<p class="text-sm leading-5 text-center text-slate-500">
					<span>Don't have an account? </span>
					<a
						href="/sign-up"
						class="text-sm leading-5 text-center underline cursor-pointer text-slate-500 underline-offset-4"
					>
						Sign up
					</a>
				</p>
			</template>
		</UCard>
	</main>
</template>
