<script setup lang="ts">
import Logo from "~/public/logo.webp";
</script>

<template>
	<div class="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
		<div class="hidden md:block border-r border-neutral-300 bg-neutral-100/80">
			<div class="flex h-full max-h-screen flex-col gap-2">
				<div class="flex h-14 items-center border-b border-neutral-300 px-4 lg:h-[60px] lg:px-6">
					<NuxtLink to="/" class="flex items-center gap-2">
						<img :src="Logo" alt="logo" class="size-10" height="100" width="100">
						<p class="text-xl font-bold">
							Advisor Tribe
						</p>
					</NuxtLink>
				</div>

				<div class="flex-1">
					<nav class="grid items-start px-2 lg:px-4">
						<DashboardLinks />
					</nav>
				</div>
			</div>
		</div>

		<slot />
	</div>
</template>
