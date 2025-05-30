<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();
</script>

<template>
	<UButton
		color="neutral"
		variant="outline"
		class="flex gap-2"
		size="lg"
		:loading="authStore.loading"
		:disabled="authStore.loading"
		@click="authStore.calendlySignIn"
	>
		<UIcon name="simple-icons:calendly" />
		Sign in with Calendly
	</UButton>
</template>
