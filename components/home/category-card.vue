<script setup lang="ts">
import type { Category } from "./types";
import { defineProps } from "vue";

const props = defineProps<{
	category: Category;
}>();
</script>

<template>
	<a
		href="http://localhost:3000/browse"
		class="cursor-pointer"
	>
		<div
			class="h-full transition-all hover:scale-105 hover:shadow-md cursor-pointer border-gray-200 border rounded-xl"
		>
			<div class="flex flex-col items-center p-5 text-center cursor-pointer">
				<div
					:class="`flex justify-center items-center mb-3 w-12 h-12 text-center ${category.iconColor} ${category.bgColor} rounded-full cursor-pointer decoration-${category.iconColor.replace('text-', '')} outline-${category.iconColor.replace('text-', '')}`"
				>
					<Icon :name="`lucide:${category.icon}`" size="1.5em" />
				</div>
				<h3
					class="mb-1 font-medium text-center cursor-pointer max-sm:text-sm max-sm:leading-5"
				>
					{{ category.name }}
				</h3>
			</div>
		</div>
	</a>
</template>
