<script setup lang="ts">
import type { RadioGroupItem } from "@nuxt/ui";
import { ZodError } from "zod/v4";
import { durations } from "~/lib/time";
import { MeetingTypeSchema } from "~/validation/new-meeting-type-schema";

definePageMeta({
  layout: "dashboard-layout",
});

const config = useRuntimeConfig();
const authStore = useAuthStore();

const videoCallProviders = ref<RadioGroupItem[]>(["Google Meet", "Microsoft Teams"]);

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
    const validMeetingType = MeetingTypeSchema.parse({
      ...formState,
      userId: authStore.user?.id,
    });

    // send payload to api endpoint
    await $fetch("/api/meeting-type/create", {
      method: "POST",
      body: validMeetingType,
    });

    toast.add({
      title: "New Type of Meeting created!",
      color: "success",
    });

    navigateTo("/dashboard/meeting-types");
  }
  catch (err: any) {
    console.error("Meeting Type Form Error", err);
    const formError = err instanceof ZodError
      ? err.issues[0].message || "Invalid input"
      : err.message || "An error occurred";

    return toast.add({
      title: "Failed to create new meeting type",
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
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold">
          Create New Meeting Type
        </h1>
        <p class="mt-1 text-base text-neutral-500">
          Add a type of meeting that clients can book.
        </p>
      </div>
    </template>

    <UForm :state="formState" class="space-y-4" @submit.prevent="onSubmit">
      <UFormField label="Title" name="title">
        <UInput v-model="formState.title" size="lg" placeholder="My Meeting" class="flex" />
      </UFormField>
      <UFormField label="URL Slug" name="slug">
        <UButtonGroup size="lg" class="flex">
          <UButton color="neutral" variant="subtle" as="label" class="cursor-default w-fit text-neutral-500 text-nowrap">
            {{ `${config.public.baseURL}/${authStore.user?.linkName}/` }}
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
        <UButton to="/dashboard/meeting-types" type="button" size="xl" color="primary" variant="soft" :loading="isLoading" block>
          Cancel
        </UButton>
        <UButton type="submit" size="xl" :loading="isLoading" block>
          Create
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
