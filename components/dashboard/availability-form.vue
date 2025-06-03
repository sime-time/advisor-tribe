<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();
const availability = useFetch(`/api/availability/${authStore.user?.id}`, {
	lazy: true,
});
</script>

<template>
	<UCard>
		<template #header>
			<h1 class="text-3xl font-bold">
				Settings
			</h1>
			<p class="text-neutral-500 text-base">
				Manage your account settings
			</p>
		</template>
		<div v-for="item in availability">
			{{ item.weekDay }}
		</div>
	</UCard>
</template>
