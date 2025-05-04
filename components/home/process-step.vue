<script setup lang="ts">
import type { ProcessStep } from "./types";

const props = defineProps<{
	step: ProcessStep;
}>();
</script>

<template>
	<div class="relative">
		<div
			v-if="!step.isLast"
			class="absolute top-8 left-full w-full h-0.5 bg-slate-100 max-md:hidden"
		>
			<div class="absolute right-0 top-2/4">
				<svg
					width="20"
					height="8"
					viewBox="0 0 20 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="overflow-x-hidden overflow-y-hidden w-5 h-2 align-middle fill-none"
				>
					<path d="M16 0L20 4L16 8V0Z" fill="#D1D5DB" />
					<path d="M0 4H16" stroke="#D1D5DB" stroke-width="2" />
				</svg>
			</div>
		</div>
		<div
			class="flex flex-col items-center p-6 h-full text-center bg-white rounded-xl border border-solid border-b-slate-200 border-l-slate-200 border-r-slate-200 border-t-slate-200"
		>
			<div class="flex justify-center items-center mb-4 w-16 h-16 text-center">
				<Icon
					:name="`lucide:${step.icon}`"
					:class="`${step.iconColor}`"
					size="2.5rem"
				/>
			</div>
			<div
				class="px-3 py-1 mb-3 text-sm font-medium leading-5 text-center text-violet-700 bg-violet-100 rounded-full decoration-violet-700 outline-violet-700"
			>
				Step {{ step.step }}
			</div>
			<h3 class="mb-3 text-xl font-semibold leading-7 text-center">
				{{ step.title }}
			</h3>
			<p
				class="text-center decoration-slate-500 outline-slate-500 text-slate-500"
			>
				{{ step.description }}
			</p>
		</div>
	</div>
</template>
