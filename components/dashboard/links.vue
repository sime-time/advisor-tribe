<script setup lang="ts">
interface DashboardNavItem {
	id: number;
	label: string;
	href: string;
	icon: string;
	active: boolean;
}

const route = useRoute();

// array is computed so when the url route changes, 'active' updates
const links = computed<DashboardNavItem[]>(() => [
	{
		id: 0,
		label: "My Tribe",
		icon: "i-lucide-users-round",
		href: "/dashboard",
		active: route.path === "/dashboard",
	},
	{
		id: 1,
		label: "Meetings",
		icon: "i-lucide-calendar-days",
		href: "/dashboard/meetings",
		active: route.path === "/dashboard/meetings",
	},
	{
		id: 2,
		label: "Availability",
		icon: "i-lucide-calendar-clock",
		href: "/dashboard/availability",
		active: route.path === "/dashboard/availability",
	},
	{
		id: 3,
		label: "Subscriptions",
		icon: "i-lucide-calendar-sync",
		href: "/dashboard/subscriptions",
		active: route.path === "/dashboard/subscriptions",
	},
	// {
	// 	id: 4,
	// 	label: "Plans",
	// 	icon: "i-lucide-briefcase",
	// 	href: "/dashboard/plans",
	// 	active: route.path === "/dashboard/plans",
	// },
	{
		id: 5,
		label: "Settings",
		icon: "i-lucide-settings",
		href: "/dashboard/settings",
		active: route.path === "/dashboard/settings",
	},
]);
</script>

<template>
	<NuxtLink
		v-for="link in links"
		:key="link.id"
		:to="link.href"
		:active-class="link.active ? 'text-primary bg-primary-100' : 'text-netural-500'"
		class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
	>
		<UIcon :name="link.icon" class="size-5" />
		{{ link.label }}
	</NuxtLink>
</template>
