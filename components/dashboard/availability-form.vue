<script setup lang="ts">
import type { DayAvailability } from "~/db/queries/types";
import { ZodError } from "zod/v4";
import { getDayName, times, timeZones } from "~/lib/time";
import { useAuthStore } from "~/stores/auth-store";
import { ScheduleSchema } from "~/validation/schedule-schema";

const authStore = useAuthStore();
const timeZone = ref("");

// make useFetch reactive to authStore.user.id by making it a return function
const { data: schedule, pending } = await useFetch<DayAvailability[]>(
  () => `/api/availability/${authStore.user?.id}`,
  {
    lazy: true,
    // only fetch when user.id is available
    immediate: !!authStore.user?.id,
    // retrigger the fetch when the user.id changes
    watch: [() => authStore.user?.id],
  },
);
const weekSchedule = reactive(schedule);

// handle submission
const isLoading = ref(false);
const toast = useToast();

async function onSubmit() {
  isLoading.value = true;
  try {
    // this json will be sent to the api
    const validSchedule = ScheduleSchema.parse({
      timeZone: timeZone.value,
      weekSchedule: weekSchedule.value,
    });

    // send payload to api endpoint
    await $fetch("/api/availability/update", {
      method: "POST",
      body: validSchedule,
    });

    toast.add({
      title: "Availability saved!",
      color: "success",
    });

    await refreshNuxtData();
  }
  catch (err: any) {
    console.error("Availability Form Error", err);
    const formError = err instanceof ZodError
      ? err.issues[0].message || "Invalid input"
      : err.message || "An error occurred";

    return toast.add({
      title: "Failed to update availability",
      description: formError,
      icon: "i-lucide-triangle-alert",
      color: "error",
    });
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <header class="flex flex-col">
        <h1 class="text-3xl font-bold">
          Set your availability
        </h1>
        <p class="mt-1 text-base text-neutral-500">
          Set what time and day users are able to book meetings with
          you.
        </p>
      </header>
    </template>

    <div v-if="pending || !schedule || !authStore.user">
      <LoadingSpinner />
    </div>

    <div v-else>
      <UForm
        :state="{ timeZone, weekSchedule }"
        class="flex flex-col gap-y-6"
        @submit.prevent="onSubmit"
      >
        <!-- Timezone -->
        <UFormField label="Time zone">
          <USelectMenu
            v-model="timeZone"
            size="lg"
            :items="timeZones"
            placeholder="Select a time zone"
          />
        </UFormField>

        <!-- Weekly schedule -->
        <div
          v-for="day in weekSchedule"
          :key="day.weekDay"
          class="grid grid-cols-2 md:grid-cols-3 items-center gap-x-4 gap-y-2 min-h-10"
        >
          <div class="col-span-2 md:col-span-1">
            <USwitch
              v-model="day.isActive"
              :label="getDayName(day.weekDay)"
              size="xl"
            />
          </div>

          <template v-if="day.isActive">
            <USelect
              v-model="day.startTime"
              :items="times"
              placeholder="From Time"
              size="xl"
            />
            <USelect
              v-model="day.endTime"
              :items="times"
              placeholder="End Time"
              size="xl"
            />
          </template>
        </div>
        <UButton type="submit" size="xl" class="flex justify-center lg:w-1/4" :loading="isLoading">
          Save Changes
        </UButton>
      </UForm>
    </div>
  </UCard>
</template>
