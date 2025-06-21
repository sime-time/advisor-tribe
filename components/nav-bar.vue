<script setup lang="ts">
import { motion } from "motion-v";
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();
const menuOpen = ref(false);

const navLinks = [
  {
    id: 1,
    label: "Pricing",
    href: "/#pricing",
  },
  {
    id: 2,
    label: "FAQ",
    href: "/#faq",
  },

];
</script>

<template>
  <nav class="sticky top-0 z-50 border-b border-solid backdrop-blur-sm bg-white bg-opacity-80 border-b-slate-200">
    <div class="flex justify-between items-center px-4 py-3 mx-auto w-full max-w-[1400px] max-md:max-w-none">
      <NuxtLink
        to="/"
        class="flex gap-2 items-center cursor-pointer"
      >
        <img src="/logo.webp" alt="logo" height="50" width="50">
        <span class="text-xl font-bold leading-7 text-primary-600">Linq<span class="text-secondary">Coach</span></span>
      </NuxtLink>

      <div class="flex gap-6 items-center max-sm:hidden">
        <template v-for="link in navLinks" :key="link.id">
          <NuxtLink
            :to="link.href"
            class="transition-colors ease-in-out cursor-pointer decoration-slate-950 decoration-opacity-80 duration-[0.15s] outline-slate-950 outline-opacity-80 text-slate-950 text-opacity-80"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
        <div v-if="!authStore.authenticated" class="flex gap-3 items-center">
          <AuthSignInModal>
            <UButton size="lg">
              Get Started
            </UButton>
          </AuthSignInModal>
        </div>
        <div v-else class="flex gap-6 items-center">
          <NuxtLink
            to="/dashboard"
            class="transition-colors ease-in-out cursor-pointer decoration-slate-950 decoration-opacity-80 duration-[0.15s] outline-slate-950 outline-opacity-80 text-slate-950 text-opacity-80"
          >
            Dashboard
          </NuxtLink>
          <UButton size="lg" variant="outline" :loading="authStore.loading" :disabled="authStore.loading" @click="authStore.signOut">
            Sign Out
          </UButton>
        </div>
      </div>

      <!-- Toggle Mobile Menu -->
      <button aria-label="toggle navigation menu" class="md:hidden" @click="() => (menuOpen = !menuOpen)">
        <div v-if="menuOpen" class="flex items-center">
          <UIcon name="lucide:x" size="1.7rem" />
        </div>
        <div v-else class="flex items-center">
          <UIcon name="lucide:menu" size="1.7rem" />
        </div>
      </button>
    </div>

    <!-- Mobile Menu -->
    <motion.div
      v-if="menuOpen"
      :initial="{ height: 0, opacity: 0, transform: 'translateY(-10px)' }"
      :animate="menuOpen ? { height: 'auto', opacity: 1, transform: 'translateY(0)' } : { height: 0, opacity: 0, transform: 'translateY(-10px)' }"
      :transition="{ duration: 0.15, ease: 'easeInOut' }"
      class="absolute top-full left-0 right-0 bg-white border-b border-neutral-200 will-change-transform"
    >
      <div class="overflow-hidden md:hidden p-4 mb-4 transform-gpu">
        <div class="flex flex-col gap-4 font-medium text-lg">
          <template v-for="link in navLinks" :key="link.id">
            <NuxtLink
              :to="link.href"
              class="px-2 py-2 text-foreground/80 hover:text-primary transition-colors"
              @click="() => (menuOpen = false)"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
          <div v-if="!authStore.authenticated" class="flex flex-col gap-4 font-medium text-lg">
            <AuthSignInModal>
              <UButton size="xl" class="justify-center">
                Get Started
              </UButton>
            </AuthSignInModal>
          </div>

          <div v-else class="flex flex-col gap-4 font-medium text-lg">
            <NuxtLink
              to="/dashboard"
              class="px-2 py-2 text-foreground/80 hover:text-primary transition-colors"
              @click="() => (menuOpen = false)"
            >
              Dashboard
            </NuxtLink>
            <UButton
              size="lg"
              class="justify-center font-medium text-lg"
              variant="outline"
              aria-label="sign out"
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
