<script setup lang="ts">
import { motion } from "motion-v";
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();

const menuOpen = ref(false);
</script>

<template>
	<nav class="sticky top-0 z-50 border-b border-solid backdrop-blur-sm bg-white bg-opacity-80 border-b-slate-200">
		<div
			class="flex justify-between items-center px-4 py-3 mx-auto w-full max-w-[1400px] max-md:max-w-none"
		>
			<NuxtLink
				to="/"
				class="flex gap-2 items-center cursor-pointer"
			>
				<div
					class="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer bg-[linear-gradient(to_right,rgb(105,65,198),rgb(59,130,246))]"
				>
					<span
						class="font-bold text-white cursor-pointer outline-white decoration-white"
					>AT</span>
				</div>
				<span class="text-xl font-bold leading-7 cursor-pointer">Advisor Tribe</span>
			</NuxtLink>

			<div class="flex gap-6 items-center max-sm:hidden">
				<NuxtLink
					to="/browse"
					class="transition-colors ease-in-out cursor-pointer decoration-slate-950 decoration-opacity-80 duration-[0.15s] outline-slate-950 outline-opacity-80 text-slate-950 text-opacity-80"
				>
					Browse
				</NuxtLink>
				<div v-if="!authStore.authenticated" class="flex gap-3 items-center">
					<UButton to="/sign-in" size="lg" variant="outline">
						Sign in
					</UButton>
					<UButton to="/sign-up" size="lg">
						Get Started
					</UButton>
				</div>
				<div v-else class="flex gap-6 items-center">
					<NuxtLink
						to="/dashboard"
						class="transition-colors ease-in-out cursor-pointer decoration-slate-950 decoration-opacity-80 duration-[0.15s] outline-slate-950 outline-opacity-80 text-slate-950 text-opacity-80"
					>
						My Tribe
					</NuxtLink>
					<UButton size="lg" variant="outline" :loading="authStore.loading" :disabled="authStore.loading" @click="authStore.signOut">
						Sign Out
					</UButton>
				</div>
			</div>

			<button class="md:hidden" @click="() => (menuOpen = !menuOpen)">
				<div v-if="menuOpen" class="flex items-center">
					<UIcon name="lucide:x" size="1.7rem" />
				</div>
				<div v-else class="flex items-center">
					<UIcon name="lucide:menu" size="1.7rem" />
				</div>
			</button>
		</div>

		<motion.div
			v-show="menuOpen"
			:initial="{ height: 0, opacity: 0, transform: 'translateY(-10px)' }"
			:animate="menuOpen ? { height: 'auto', opacity: 1, transform: 'translateY(0)' } : { height: 0, opacity: 0, transform: 'translateY(-10px)' }"
			:transition="{ duration: 0.15, ease: 'easeInOut' }"
			class="will-change-transform"
		>
			<div class="overflow-hidden md:hidden p-4 mb-4 transform-gpu">
				<div class="flex flex-col gap-4 font-medium text-lg">
					<NuxtLink
						to="/"
						class="px-2 py-2 text-foreground/80 hover:text-primary transition-colors"
						@click="() => (menuOpen = false)"
					>
						Home
					</NuxtLink>
					<NuxtLink
						to="/browse"
						class="px-2 py-2 text-foreground/80 hover:text-primary transition-colors"
						@click="() => (menuOpen = false)"
					>
						Browse Advisors
					</NuxtLink>

					<div v-if="!authStore.authenticated" class="flex flex-col gap-4 font-medium text-lg">
						<UButton variant="outline" size="xl" class="justify-center" @click="() => { menuOpen = false; navigateTo('/sign-in'); }">
							Sign in
						</UButton>
						<UButton size="xl" class="justify-center" @click="() => { menuOpen = false; navigateTo('/sign-up'); }">
							Get Started
						</UButton>
					</div>

					<div v-else class="flex flex-col gap-4 font-medium text-lg">
						<NuxtLink
							to="/dashboard"
							class="px-2 py-2 text-foreground/80 hover:text-primary transition-colors"
							@click="() => (menuOpen = false)"
						>
							My Tribe
						</NuxtLink>
						<UButton
							size="lg"
							class="justify-center font-medium text-lg"
							variant="outline"
							:loading="authStore.loading"
							:disabled="authStore.loading"
							@click="authStore.signOut"
						>
							Sign Out
						</UButton>
					</div>
				</div>
			</div>
		</motion.div>
	</nav>
</template>
