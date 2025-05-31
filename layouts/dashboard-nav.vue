<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();
const route = useRoute();
const collapseMenu = ref(false);

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: "My Tribe",
		icon: "i-lucide-users-round",
		to: "/dashboard",
		active: route.path === "/dashboard",
	},
	{
		label: "Meetings",
		icon: "i-lucide-calendar",
		to: "/dashboard/meetings",
		active: route.path === "/dashboard/meetings",
	},
	{
		label: "Availability",
		icon: "i-lucide-calendar",
		to: "/dashboard/availability",
		active: route.path === "/dashboard/availability",
	},
	{
		label: "Subscriptions",
		icon: "i-lucide-briefcase-business",
		to: "/dashboard/subscriptions",
		active: route.path === "/dashboard/subscriptions",
	},
	{
		label: "Settings",
		icon: "i-lucide-settings",
		to: "/dashboard/settings",
		active: route.path === "/dashboard/settings",
	},
	{
		label: "Collapse",
		icon: collapseMenu.value ? "i-lucide-arrow-right" : "i-lucide-arrow-left",
		onSelect: () => { collapseMenu.value = !collapseMenu.value; },
	},
]);
</script>

<template>
	<div class="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
		<div class="hidden md:block border-r bg-neutral-400/40">
			<div class="flex h-full max-h-screen flex-col gap-2">
				<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<NuxtLink to="/" />
				</div>
			</div>
			<UButton
				icon="i-lucide-log-out"
				class="w-full justify-center"
				variant="outline"
				color="error"
				:loading="authStore.loading"
				:disabled="authStore.loading"
				@click="authStore.signOut"
			>
				{{ collapseMenu ? "" : "Log out" }}
			</UButton>
		</div>
		<slot />
	</div>
</template>
