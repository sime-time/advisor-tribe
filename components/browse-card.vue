<template>
	<UCard class="shadow-sm">
		<div class="flex justify-between">
			<NuxtLink to="/advisor/#">
				<UAvatar src="https://randomuser.me/api/portraits/women/23.jpg" size="xl" class="h-[50px] w-fit hover:outline outline-primary-500" />
			</NuxtLink>
			<UBadge class="rounded-full font-semibold h-2/3 text-sm" color="neutral" variant="soft">
				<UIcon name="line-md:star-alt-filled" class="text-primary-500 text-lg" />
				4.9
			</UBadge>
		</div>
		<div class="my-3 flex flex-col gap-1.5">
			<NuxtLink to="/advisor/#">
				<h2 class="font-semibold text-xl">
					Dr. Sarah Chen
				</h2>
			</NuxtLink>
			<p class="text-neutral-600/90 text-md">
				Biotech Executive & Researcher
			</p>
			<p class="text-neutral-600/90 text-sm flex items-center gap-1">
				<UIcon name="lucide:map-pin" />
				San Francisco, California
			</p>
			<p class="text-sm mb-4 line-clamp-2">
				20+ years in pharmaceutical research and biotech leadership. Passionate about mentoring young scientists and career transitions.
			</p>
			<div class="flex gap-2">
				<UBadge color="neutral" variant="soft" class="rounded-full font-bold">
					Science
				</UBadge>
				<UBadge color="neutral" variant="soft" class="rounded-full font-bold">
					Technology
				</UBadge>
				<UBadge color="neutral" variant="soft" class="rounded-full font-bold">
					Career
				</UBadge>
			</div>
		</div>
		<UButton icon="i-lucide-plus" size="lg" class="w-full justify-center mt-3">
			Invite to My Tribe
		</UButton>
	</UCard>
</template>
