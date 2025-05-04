<script setup lang="ts">
import type { AdvisorUser } from "~/lib/db/queries/types";

const props = defineProps<{
	advisor: AdvisorUser;
}>();
</script>

<template>
	<UCard class="shadow-sm">
		<div class="flex justify-start">
			<NuxtLink to="#">
				<UAvatar :src="advisor.image || ''" size="xl" class="h-[50px] w-fit " />
			</NuxtLink>
		</div>
		<div class="my-3 flex flex-col gap-1.5">
			<NuxtLink to="#">
				<h2 class="font-semibold text-xl hover:text-primary-700 transition-colors ease-linear">
					{{ props.advisor.name }}
				</h2>
			</NuxtLink>
			<p class="text-neutral-600/90 text-md">
				{{ advisor.title }}
			</p>
			<p class="text-neutral-600/90 text-sm flex items-center gap-1">
				<UIcon name="lucide:map-pin" />
				{{ `${advisor.city}, ${advisor.state}` }}
			</p>
			<p class="text-sm mb-4 line-clamp-2">
				{{ advisor.bio }}
			</p>
			<div class="flex flex-row gap-2 flex-wrap">
				<div v-for="category in advisor.categories" :key="category.id">
					<UBadge color="neutral" variant="soft" class="rounded-full font-bold">
						{{ category.categoryName }}
					</UBadge>
				</div>
			</div>
		</div>
		<UButton size="lg" class="w-full justify-center mt-3">
			<UIcon name="i-lucide-circle-user" class="text-lg" />
			View Profile
		</UButton>
	</UCard>
</template>
