<script setup lang="ts">
import { motion } from "motion-v";
</script>

<template>
  <section class="overflow-x-hidden overflow-y-hidden relative">
    <!-- Background elements -->
    <div class="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-[10%] h-72 w-72 rounded-full bg-secondary-500 opacity-10 blur-3xl"
      />
      <div
        class="absolute bottom-20 right-[10%] h-96 w-96 rounded-full bg-primary-500 opacity-10 blur-3xl"
      />
    </div>

    <div
      class="px-4 py-28 mx-auto w-full max-w-[1400px] max-md:max-w-none max-sm:py-20"
    >
      <motion.div
        :initial="{ opacity: 0, y: 40 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
        class="mx-auto max-w-screen-md text-center"
      >
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          All-in-one Coaching Tool for Creators
        </h1>
        <p
          class="mx-auto mb-8 md:max-w-2xl text-lg md:text-xl leading-7 text-center text-gray-600 decoration-gray-600 outline-gray-600  "
        >
          Stop juggling different business tools.<br>
          Start booking, billing, and coaching from a <span class="italic">single link-in-bio.</span>
        </p>
        <div class="flex gap-4 justify-center text-center">
          <AuthSignInModal>
            <UButton size="xl">
              Get Started
            </UButton>
          </AuthSignInModal>
          <UButton size="xl" variant="outline" to="/">
            See Pricing
          </UButton>
        </div>
      </motion.div>
    </div>
  </section>
</template>
