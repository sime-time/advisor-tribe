<script setup lang="ts">
import { ZodError } from "zod/v4";
import { BookMeetingSchema } from "~/validation/book-meeting-schema";

const props = defineProps<{
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  grantId: string;
  grantEmail: string;
  videoCallSoftware: string;
}>();

// form state
const formState = reactive({
  name: "",
  email: "",
});

// handle submission
const isLoading = ref(false);
const toast = useToast();

async function onSubmit() {
  isLoading.value = true;
  try {
    // this json will be sent to the api
    const validBooking = BookMeetingSchema.parse({
      ...props,
      name: formState.name,
      email: formState.email,
    });

    // send payload to api endpoint
    await $fetch("/api/meeting/create", {
      method: "POST",
      body: validBooking,
    });

    toast.add({
      title: "Meeting booked!",
      color: "success",
    });

    navigateTo("/success");
  }
  catch (err: any) {
    console.error("Book Meeting Error", err);

    const formError = err instanceof ZodError
      ? err.issues[0].message || "Invalid input"
      : err.message || "An error occurred";

    return toast.add({
      title: "Failed to book meeting",
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
  <UForm :state="formState" class="flex flex-col justify-evenly space-y-5 mt-5 md:space-y-0 md:mt-0" @submit.prevent="onSubmit">
    <UFormField label="Name" size="lg">
      <UInput v-model="formState.name" placeholder="Enter your name" class="w-full" name="name" />
    </UFormField>
    <UFormField label="Email" size="lg">
      <UInput v-model="formState.email" placeholder="Enter your email" class="w-full" name="email" />
    </UFormField>
    <UButton
      type="submit"
      size="lg"
      class="mt-1"
      block
      :disabled="isLoading"
      :loading="isLoading"
    >
      Book Meeting
    </UButton>
  </UForm>
</template>
