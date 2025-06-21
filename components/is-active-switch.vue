<script setup lang="ts">
import { ZodError } from "zod/v4";

const props = defineProps<{
  initialChecked: boolean;
  meetingTypeId: number;
  refreshMeetingTypes: () => Promise<void>;
}>();

const isLoading = ref(false);
const toast = useToast();
const isActive = ref(props.initialChecked);

// when isActive switches, call the set-active backend api
watch(() => isActive.value, (newBool) => {
  handleIsActiveSwitch(props.meetingTypeId, newBool);
});

async function handleIsActiveSwitch(meetingTypeId: number, isActive: boolean) {
  isLoading.value = true;
  try {
    // send payload to api endpoint
    await $fetch("/api/meeting-type/set-active", {
      method: "POST",
      body: {
        meetingTypeId,
        isActive,
      },
    });

    toast.add({
      title: "Meeting type updated!",
      color: "success",
    });

    // refetch the meetings list
    await props.refreshMeetingTypes();
  }
  catch (err: any) {
    console.error("Meeting Type Active Switch Error", err);
    const formError = err instanceof ZodError
      ? err.issues[0].message
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
  <USwitch
    v-model="isActive"
    :default-value="props.initialChecked"
    :loading="isLoading"
    :description="isActive ? 'Active' : 'Hidden'"
  />
</template>
