<script setup lang="ts">
import type { Category } from "./types";
import { ref } from "vue";

const categories = ref<Category[]>([
  {
    name: "Business",
    path: "business",
    iconColor: "text-blue-800",
    bgColor: "bg-blue-100",
    icon: "briefcase",
  },
  {
    name: "Healthcare",
    path: "healthcare",
    iconColor: "text-red-800",
    bgColor: "bg-red-100",
    icon: "stethoscope",
  },
  {
    name: "Education",
    path: "education",
    iconColor: "text-yellow-800",
    bgColor: "bg-yellow-100",
    icon: "book-open",
  },
  {
    name: "Finance",
    path: "finance",
    iconColor: "text-green-800",
    bgColor: "bg-green-100",
    icon: "circle-dollar-sign",
  },
  {
    name: "Fitness",
    path: "fitness",
    iconColor: "text-orange-800",
    bgColor: "bg-orange-100",
    icon: "dumbbell",
  },
  {
    name: "Technology",
    path: "technology",
    iconColor: "text-indigo-800",
    bgColor: "bg-indigo-100",
    icon: "code",
  },
  {
    name: "Arts",
    path: "arts",
    iconColor: "text-pink-800",
    bgColor: "bg-pink-100",
    icon: "pen-tool",
  },
  {
    name: "Personal Development",
    path: "personal development",
    iconColor: "text-purple-800",
    bgColor: "bg-purple-100",
    icon: "user",
  },
  {
    name: "Real Estate",
    path: "real estate",
    iconColor: "text-teal-800",
    bgColor: "bg-teal-100",
    icon: "building",
  },
  {
    name: "Science",
    path: "science",
    iconColor: "text-cyan-800",
    bgColor: "bg-cyan-100",
    icon: "atom",
  },
]);
</script>

<template>
  <section class="py-16">
    <div class="px-4 mx-auto w-full max-w-[1400px]">
      <div class="mb-12 text-center">
        <h2 class="mb-2 text-3xl font-bold leading-9 text-center">
          Browse by Category
        </h2>
        <p
          class="mx-auto max-w-2xl text-center text-gray-600 decoration-gray-600 outline-gray-600"
        >
          Find advisors in specific fields who can provide targeted guidance
          based on your needs.
        </p>
      </div>
      <div
        class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <HomeCategoryCard
          v-for="category in categories"
          :key="category.path"
          :category="category"
        />
      </div>
    </div>
  </section>
</template>
