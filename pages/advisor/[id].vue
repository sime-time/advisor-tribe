<script setup lang="ts">
const route = useRoute();

let advisorId: number;

if (Array.isArray(route.params.id)) {
	advisorId = Number.parseInt(route.params.id[0]);
}
else {
	advisorId = Number.parseInt(route.params.id);
}

// fetch a single advisor from the id
const { data: advisor } = await useFetch(`/api/advisors/${advisorId}`);
</script>

<template>
	<main>
		<div class="container flex flex-col md:flex-row mx-auto gap-7 md:py-8">
			<AdvisorProfileCard :advisor="advisor" class="flex-3" />
			<UCard class="flex-2" />
		</div>
	</main>
</template>
