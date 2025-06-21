<script setup lang="ts">
import type { ProcessStep as ProcessStepType } from "./types";
import { ref } from "vue";

const steps = ref<ProcessStepType[]>([
  {
    step: 1,
    title: "Create your unique link",
    description:
      "Connect Stripe & your calendars.",
    icon: "link",
    iconColor: "text-blue-400",
  },
  {
    step: 2,
    title: "Add sessions & pricing",
    description:
      "1-on-1, groups, and package plans. Simply drag-and-drop.",
    icon: "mouse-pointer-click",
    iconColor: "text-amber-500",
  },
  {
    step: 3,
    title: "Share & monetize",
    description:
      "Post your link anywhere. Clients book, pay & get calendar invites automatically.",
    icon: "circle-dollar-sign",
    iconColor: "text-green-500",
    isLast: true,
  },
]);
</script>

<template>
  <section
    id="how-it-works"
    class="py-16 bg-[linear-gradient(rgb(255,255,255),rgba(241,245,249,0.3))]"
  >
    <div class="px-4 mx-auto w-full max-w-[1400px] max-md:max-w-none">
      <div class="mx-auto mb-16 max-w-screen-md text-center">
        <h2 class="mb-3 text-3xl md:text-4xl font-bold leading-9 text-center">
          How It Works
        </h2>
        <p
          class="mx-auto mb-8 md:max-w-2xl text-lg md:text-xl leading-7 text-center text-neutral-600  "
        >
          Your journey to financial freedom is simple
        </p>
      </div>
      <div class="grid gap-8 mb-12 md:grid-cols-3">
        <HomeProcessStep v-for="step in steps" :key="step.step" :step="step" />
      </div>
    </div>
  </section>
</template>
