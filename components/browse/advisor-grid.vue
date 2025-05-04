<script setup lang="ts">
import type { AdvisorUser } from "~/lib/db/queries/types";

const props = defineProps<{
	advisors: AdvisorUser[];
}>();
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-7">
		<div v-for="advisor in props.advisors" :key="advisor.id">
			<BrowseAdvisorCard :advisor="advisor" />
		</div>
	</div>
</template>
