<template>
	<section
		class="px-4 py-16 text-white outline-white bg-[linear-gradient(to_right,rgb(105,65,198),rgb(59,130,246))] decoration-white"
	>
		<div
			class="px-8 mx-auto w-full text-center text-white outline-white decoration-white max-w-[1400px] max-md:max-w-none"
		>
			<h2
				class="mb-4 text-4xl font-bold leading-10 text-center text-white outline-white decoration-white max-sm:text-3xl max-sm:leading-9"
			>
				Ready to Build Your Advisor Tribe?
			</h2>
			<p
				class="mx-auto mb-8 max-w-3xl text-xl leading-7 text-center text-white opacity-90 outline-white decoration-white max-sm:text-lg"
			>
				Bring together mentors, advisors, friends, family, and experts — all in one place.
			</p>
			<div
				class="flex gap-4 justify-center text-center text-white outline-white decoration-white max-sm:flex-col"
			>
				<UButton
					to="/sign-up"
					color="neutral"
					variant="outline"
					size="xl"
					class="flex justify-center"
				>
					Get Started for Free
				</UButton>
			</div>
		</div>
	</section>
</template>
