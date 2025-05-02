<script setup lang="ts">
defineProps<{
	text: string;
}>();
</script>

<template>
	<div class="relative">
		<div class="flex absolute inset-0 items-center">
			<div class="w-full border-t border-solid border-t-slate-200" />
		</div>
		<div class="flex relative justify-center text-sm leading-5">
			<span class="px-2 text-sm leading-5 bg-white text-slate-500">
				{{ text }}
			</span>
		</div>
	</div>
</template>
