<template>
	<section class="overflow-x-hidden overflow-y-hidden relative">
		<!-- Background elements -->
		<div class="absolute inset-0 z-10 overflow-hidden pointer-events-none">
			<div
				class="absolute top-20 left-[10%] h-72 w-72 rounded-full bg-purple-400 opacity-10 blur-3xl"
			/>
			<div
				class="absolute bottom-20 right-[10%] h-96 w-96 rounded-full bg-blue-500 opacity-10 blur-3xl"
			/>
		</div>

		<div
			class="px-4 py-28 mx-auto w-full max-w-[1400px] max-md:max-w-none max-sm:py-20"
		>
			<div class="mx-auto max-w-screen-md text-center">
				<h1
					class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent"
				>
					Build Your Personal Board of Advisors
				</h1>
				<p
					class="mx-auto mb-8 max-w-2xl text-xl leading-7 text-center text-gray-600 decoration-gray-600 outline-gray-600 max-sm:text-lg"
				>
					Connect with mentors, experts, and coaches across various fields to
					create your personal council of trusted advisors who can help guide
					your decisions.
				</p>
				<div class="flex gap-4 justify-center text-center">
					<OauthSignInModal>
						<UButton size="xl">
							Get Started
						</UButton>
					</OauthSignInModal>
					<UButton size="xl" variant="outline" to="/browse">
						Find Advisors
					</UButton>
				</div>
			</div>
		</div>
	</section>
</template>
