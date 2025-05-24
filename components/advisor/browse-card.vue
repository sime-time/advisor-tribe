<script setup lang="ts">
import type { AdvisorUser } from "~/db/queries/types";

defineProps<{
	advisor: AdvisorUser;
}>();
</script>

<template>
	<UCard class="shadow-sm">
		<div class="flex justify-start">
			<NuxtLink :to="`/advisor/${advisor.id}`" class="flex gap-4">
				<div>
					<UAvatar :src="advisor.image || ''" size="lg" class="h-[6rem] w-fit" />
				</div>
				<div class="flex flex-col justify-evenly items-start">
					<h2 class="font-semibold text-xl hover:text-primary-700 transition-colors ease-linear">
						{{ advisor.name }}
					</h2>
					<p class="text-neutral-600/90 text-md">
						{{ advisor.title }}
					</p>
					<p class="text-neutral-600/90 text-sm flex items-center gap-1">
						<UIcon name="lucide:map-pin" />
						{{ `${advisor.city}, ${advisor.state}` }}
					</p>
				</div>
			</NuxtLink>
		</div>
		<div class="my-3 flex flex-col gap-1.5">
			<div class="flex flex-row gap-2 flex-wrap">
				<div v-for="category in advisor.categories" :key="category.id">
					<UBadge color="neutral" variant="soft" class="rounded-full font-bold">
						{{ category.categoryName }}
					</UBadge>
				</div>
			</div>
			<p class="text-sm mt-4 line-clamp-2">
				{{ advisor.bio }}
			</p>
		</div>
		<UButton :to="`/advisor/${advisor.id}`" size="lg" class="w-full justify-center mt-3">
			<UIcon name="i-lucide-circle-user" class="text-lg" />
			View Profile
		</UButton>
	</UCard>
</template>
