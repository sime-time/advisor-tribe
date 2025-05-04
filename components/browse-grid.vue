<script setup lang="ts">
import type { Advisor } from "~/lib/db/schema";

const props = defineProps<{
	advisors: Advisor[];
}>();
</script>

<template>
	<div v-for="advisor in props.advisors" :key="advisor.id" class="grid grid-cols-3 gap-7">
		<BrowseCard :advisor="advisor" />
	</div>
</template>
