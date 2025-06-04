<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

definePageMeta({
  layout: "dashboard-layout",
});

const authStore = useAuthStore();
const advisorId = ref(0);
const plans = ref();

onMounted(() => {
  watch(
    // 1. The reactive value to watch (source)
    () => authStore.user?.id,
    // 2. The callback function to execute when the value changes (callback)
    async (userId) => {
      if (!userId)
        return;

      const result = await $fetch<number>(`/api/advisors/get-id/${userId}`);
      advisorId.value = result;
      plans.value = await $fetch(`/api/plans/${advisorId.value}`);
    },
    { immediate: true },
  );
});
</script>

<template>
  <div>
    <h1>
      My Current Plans
    </h1>
    <div v-if="plans" class="container grid grid-cols-1 lg:grid-cols-3 mx-auto gap-7 md:py-8">
      <template v-if="plans.length > 0">
        <template v-for="(plan, index) in plans" :key="index">
          <AdvisorPlan :plan="plan" />
        </template>
      </template>
    </div>
    <AdvisorCreatePlan v-if="advisorId !== 0" :advisor-id="advisorId" />
  </div>
</template>
