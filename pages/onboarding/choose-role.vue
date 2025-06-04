<script setup lang="ts">
const accountType = ref("user");
const nextPage = computed(() => {
  if (accountType.value === "advisor") {
    return "/onboarding/advisor-info";
  }
  return "/dashboard";
});
</script>

<template>
  <main class="flex justify-center items-center p-4 bg-white min-h-[754px]">
    <UCard class="w-full max-w-md bg-white rounded-lg border border-solid border-slate-200 shadow-sm">
      <header class="flex flex-col  text-center">
        <h1 class="text-2xl font-bold tracking-tight leading-8">
          Complete your account
        </h1>
        <p class="mt-1.5 text-sm leading-5 text-slate-500">
          How will you use the app?
        </p>
      </header>

      <div class="grid grid-cols-2 gap-8 mt-8">
        <label
          for="user"
          class="flex flex-col items-center justify-center text-center rounded-lg border-neutral-300 border-2 p-5"
          :class="accountType === 'user' ? 'border-primary-500 bg-primary-50 text-primary-700' : ''"
        >
          <input id="user" v-model="accountType" type="radio" value="user" name="account-type" hidden>
          <UIcon name="lucide:lightbulb" class="text-3xl" />
          <h2 class="text-lg font-semibold">
            Learner
          </h2>
          <p class="text-sm text-neutral-500">
            I'm seeking advice
          </p>
        </label>
        <label
          for="advisor"
          class="flex flex-col items-center justify-center text-center border-2 rounded-lg border-neutral-300 p-5"
          :class="accountType === 'advisor' ? 'border-primary-500 bg-primary-50 text-primary-700' : ''"
        >
          <input id="advisor" v-model="accountType" type="radio" value="advisor" name="account-type" hidden>
          <UIcon name="lucide:graduation-cap" class="text-3xl" />
          <h2 class="text-lg font-semibold">
            Advisor
          </h2>
          <p class="text-sm text-neutral-500">
            I want to give advice
          </p>
        </label>
      </div>
      <UButton :to="nextPage" size="lg" class="justify-center w-full mt-6">
        Continue
      </UButton>
    </UCard>
  </main>
</template>
