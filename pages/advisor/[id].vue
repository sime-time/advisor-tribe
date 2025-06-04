<script setup lang="ts">
const route = useRoute();

let advisorId: number;

// nuxt returns url route params as an array of strings
if (Array.isArray(route.params.id)) {
  advisorId = Number.parseInt(route.params.id[0]);
}
else {
  advisorId = Number.parseInt(route.params.id);
}

// fetch a single advisor from the id
const { data: advisor } = await useFetch(`/api/advisors/${advisorId}`);
const { data: plans } = await useFetch(`/api/plans/${advisorId}`);
</script>

<template>
  <main>
    <div v-if="advisor && plans" class="container flex flex-col md:flex-row mx-auto gap-7 md:py-8">
      <AdvisorProfileCard :advisor="advisor" class="flex-3" />
      <UCard class="flex-2">
        <div class="flex flex-col gap-6">
          <AdvisorBookCall />
          <template v-if="plans.length > 0">
            <USeparator label="or select a plan" />
            <template v-for="(plan, index) in plans" :key="index">
              <AdvisorPlan :plan="plan">
                <UButton size="xl" class="w-full justify-center">
                  Select
                </UButton>
              </AdvisorPlan>
            </template>
          </template>
        </div>
      </UCard>
    </div>
  </main>
</template>
