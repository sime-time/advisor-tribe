<script setup lang="ts">
import type { AdvisorUser } from "~/db/queries/types";

defineProps<{
	advisor: AdvisorUser;
}>();

const showFullBio = ref(false);
</script>

<template>
	<UCard class="h-fit">
		<div class="flex flex-col md:flex-row gap-6">
			<UCard variant="soft" class="flex-1 flex flex-col h-fit">
				<div class="flex justify-center mb-5 ">
					<UAvatar :src="advisor.image || ''" size="xl" class="w-[14rem] h-fit" />
				</div>
				<div class="flex gap-4 w-full">
					<UButton icon="i-lucide-message-square" size="lg" color="neutral" variant="outline" class="flex-1 justify-center">
						Message
					</UButton>
					<UButton icon="i-lucide-calendar" size="lg" color="neutral" class="flex-1 justify-center">
						Schedule
					</UButton>
				</div>
			</UCard>
			<div class="container flex-4 flex flex-col gap-5 ">
				<UBadge color="primary" variant="soft" class="w-fit" size="xl">
					{{ advisor.title }}
				</UBadge>
				<div>
					<h1 class="text-3xl font-bold">
						{{ advisor.name }}
					</h1>
					<p class="text-neutral-600/90 flex items-center gap-1">
						<UIcon name="lucide:map-pin" />
						{{ `${advisor.city}, ${advisor.state}` }}
					</p>
				</div>
				<div class="flex flex-row gap-2 flex-wrap">
					<div v-for="category in advisor.categories" :key="category.id">
						<UBadge color="neutral" variant="soft" size="lg" class="rounded-full font-semibold">
							{{ category.categoryName }}
						</UBadge>
					</div>
				</div>
				<p :class="{ 'line-clamp-5': !showFullBio }">
					{{ advisor.bio }}
				</p>
				<UButton
					v-if="advisor.bio.length > 250"
					variant="ghost"
					color="primary"
					class="w-fit"
					@click="showFullBio = !showFullBio"
				>
					{{ showFullBio ? 'Read Less' : 'Read More' }}
				</UButton>
			</div>
		</div>
	</UCard>
</template>
