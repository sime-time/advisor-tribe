<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();
</script>

<template>
	<UButton
		icon="i-lucide-log-out"
		class="w-full justify-center"
		variant="outline"
		color="error"
		:loading="authStore.loading"
		:disabled="authStore.loading"
		@click="authStore.signOut"
	>
		Log out
	</UButton>
</template>
