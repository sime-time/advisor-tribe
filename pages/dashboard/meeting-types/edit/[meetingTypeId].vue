<script setup lang="ts">
import type { RadioGroupItem } from "@nuxt/ui";
import type { MeetingType } from "~/shared/types";
import { ZodError } from "zod/v4";
import { durations } from "~/lib/time";
import { UpdateMeetingTypeSchema } from "~/validation/update-meeting-type-schema";

definePageMeta({
  layout: "dashboard-layout",
});

const config = useRuntimeConfig();
const authStore = useAuthStore();
const videoCallProviders = ref<RadioGroupItem[]>(["Google Meet", "Microsoft Teams"]);

// get the meeting type id from url param
const route = useRoute();
const meetingTypeId = route.params.meetingTypeId as string;

// fetch the meeting type data
const { data: meetingType, pending } = await useFetch<MeetingType>(`/api/meeting-type/get/${meetingTypeId}`);

// populate the form with current meeting type data
const formState = reactive({
  title: meetingType.value?.title,
  slug: meetingType.value?.slug,
  description: meetingType.value?.description,
  duration: meetingType.value?.duration,
  videoCallSoftware: meetingType.value?.videoCallSoftware,
});

const isLoading = ref(false);
const toast = useToast();

async function onSubmit() {
  isLoading.value = true;
  try {
    // this json will be sent to the api
    const validMeetingType = UpdateMeetingTypeSchema.parse({
      ...formState,
      id: meetingType.value?.id,
    });

    // send payload to api endpoint
    await $fetch("/api/meeting-type/update", {
      method: "POST",
      body: validMeetingType,
    });

    toast.add({
      title: "Meeting type updated!",
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
      title: "Failed to update meeting type",
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
          Edit Meeting Type
        </h1>
        <p class="mt-1 text-base text-neutral-500">
          Changes made will not affect previously booked meetings.
        </p>
      </div>
    </template>

    <div v-if="pending || !meetingType">
      <LoadingSpinner />
    </div>
    <UForm v-show="meetingType" :state="formState" class="space-y-4" @submit.prevent="onSubmit">
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
          Save
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
