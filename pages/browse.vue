<script setup lang="ts">
// get the advisors from db
const { data: advisors } = await useFetch("/api/advisors", {
	lazy: true,
});
</script>

<template>
	<main class="min-h-screen flex flex-col">
		<section class="flex-grow">
			<div class="py-8">
				<div class="container mx-auto pmx-">
					<h1 class="text-3xl font-bold mb-2">
						Browse Advisors
					</h1>
					<p class="text-neutral-500">
						Find the perfect advisors to join your personal board and help you navigate life's challenges
					</p>
				</div>
			</div>

			<div v-if="advisors" class="container mx-auto px-4 py-8">
				<div class="flex flex-col md:flex-row gap-8">
					<AdvisorBrowseGrid :advisors="advisors" />
				</div>
			</div>

			<div v-else class="container mx-auto px-4 py-8">
				<LoadingSpinner />
			</div>
		</section>
	</main>
</template>
