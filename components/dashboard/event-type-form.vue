<script setup lang="ts">
import type { RadioGroupItem } from "@nuxt/ui";
import { ZodError } from "zod/v4";
import { EventTypeSchema } from "~/validation/new-event-schema";

const config = useRuntimeConfig();
const authStore = useAuthStore();

const videoCallProviders = ref<RadioGroupItem[]>(["Google Meet", "Microsoft Teams", "Zoom Meeting"]);

const durations = ref([
  {
    label: "15 Minutes",
    value: 15,
  },
  {
    label: "30 Minutes",
    value: 30,
  },
  {
    label: "45 Minutes",
    value: 45,
  },
  {
    label: "1 Hour",
    value: 60,
  },
]);

const formState = reactive({
  userId: authStore.user?.id,
  title: "",
  slug: "",
  description: "",
  duration: 15,
  videoCallSoftware: videoCallProviders.value[0],
});

// handle submission
const isLoading = ref(false);
const toast = useToast();

async function onSubmit() {
  isLoading.value = true;
  try {
    // this json will be sent to the api
    const validEventType = EventTypeSchema.parse({
      ...formState,
      userId: authStore.user?.id,
    });

    // send payload to api endpoint
    await $fetch("/api/event-type/create", {
      method: "POST",
      body: validEventType,
    });

    toast.add({
      title: "New Event Type created!",
      color: "success",
    });

    navigateTo("/dashboard/event-types");
  }
  catch (err: any) {
    console.error("Event Type Form Error", err);
    const formError = err instanceof ZodError
      ? err.issues[0].message || "Invalid input"
      : err.message || "An error occurred";

    return toast.add({
      title: "Failed to create new event type",
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
  <UCard class="w-fit">
    <template #header>
      <header class="flex flex-col">
        <h1 class="text-3xl font-bold">
          Add new event type
        </h1>
        <p class="mt-1 text-base text-neutral-500">
          Create an event type that allows clients to meet with you.
        </p>
      </header>
    </template>

    <UForm :state="formState" class="space-y-4" @submit.prevent="onSubmit">
      <UFormField label="Title" name="title">
        <UInput v-model="formState.title" size="lg" placeholder="30 minute meeting" class="flex" />
      </UFormField>
      <UFormField label="URL Slug" name="slug">
        <UButtonGroup size="lg" class="flex">
          <UButton color="neutral" variant="subtle" as="label" class="cursor-default w-fit text-neutral-500 text-nowrap">
            {{ `${config.public.baseURL}/` }}
          </UButton>
          <UInput v-model="formState.slug" placeholder="my-meeting" class="flex-grow" />
        </UButtonGroup>
      </UFormField>
      <UFormField label="Description" name="description">
        <UTextarea v-model="formState.description" size="lg" class="flex" />
      </UFormField>

      <UFormField label="Duration" name="duration">
        <USelect v-model="formState.duration" :items="durations" size="lg" />
      </UFormField>

      <UFormField label="Video Call Provider" name="videoCallProvider">
        <URadioGroup
          v-model="formState.videoCallSoftware"
          variant="table"
          orientation="horizontal"
          indicator="start"
          :items="videoCallProviders"
        />
      </UFormField>

      <div class="flex justify-between gap-4 mt-6">
        <UButton to="/dashboard" type="button" size="xl" color="error" variant="soft" :loading="isLoading" block>
          Cancel
        </UButton>
        <UButton type="submit" size="xl" :loading="isLoading" block>
          Add Event
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
