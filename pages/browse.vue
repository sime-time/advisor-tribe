<template>
	<main class="min-h-screen flex flex-col">
		<section class="flex-grow">
			<div class="py-8">
				<div class="container mx-auto px-4">
					<h1 class="text-3xl font-bold mb-2">
						Browse Advisors
					</h1>
					<p class="text-neutral-500">
						Find the perfect advisors to join your personal board and help you navigate life's challenges
					</p>
				</div>
			</div>
			<div class="container mx-auto px-4 py-8">
				<div class="flex flex-col lg:flex-row gap-8">
					<BrowseGrid />
				</div>
			</div>
		</section>
	</main>
</template>
