<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();
const route = useRoute();
const collapseMenu = ref(false);
const isAdvisor = computed<boolean>(() => {
	console.log("role:", authStore.user?.role);
	if (authStore.user?.role === "advisor") {
		return true;
	}
	return false;
});

const items = computed<NavigationMenuItem[]>(() => {
	const baseItems: NavigationMenuItem[] = [
		{
			label: "Home",
			icon: "i-lucide-home",
			to: "/dashboard",
			active: route.path === "/dashboard",
		},
		{
			label: "Advisors",
			icon: "i-lucide-users-round",
			to: "/dashboard/advisors",
			active: route.path === "/dashboard/advisors",
		},
	];

	// add additional routes if user is also an advisor
	if (isAdvisor.value) {
		baseItems.push(
			{
				label: "Clients",
				icon: "i-lucide-contact-round",
				to: "/dashboard/clients",
				active: route.path === "/dashboard/clients",
			},
			{
				label: "Plans",
				icon: "i-lucide-briefcase-business",
				to: "/dashboard/plans",
				active: route.path === "/dashboard/plans",
			},
			{
				label: "Availability",
				icon: "i-lucide-calendar",
				to: "/dashboard/availability",
				active: route.path === "/dashboard/availability",
			},
		);
	}

	// routes at the end of sidebar menu
	baseItems.push(
		{
			label: "Profile",
			icon: "i-lucide-circle-user-round",
			to: "/dashboard/profile",
			active: route.path === "/dashboard/profile",
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
	);
	return baseItems;
});
</script>

<template>
	<div class="flex h-screen">
		<div class="data-[orientation=vertical]:w-48 flex flex-col justify-between p-2">
			<UNavigationMenu orientation="vertical" :items="items" :collapsed="collapseMenu" />
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
