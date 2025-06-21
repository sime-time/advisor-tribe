<script setup lang="ts">
import { ZodError } from "zod/v4";
import { useAuthStore } from "~/stores/auth-store";

definePageMeta({
  layout: "dashboard-layout",
});

const authStore = useAuthStore(); // used to create links
const isLoading = ref(false);
const toast = useToast();

export interface MeetingType {
  id: number;
  slug: string;
  duration: number;
  title: string;
  isActive: boolean;
}

const { data: meetingTypes, pending, refresh } = await useFetch<MeetingType[]>("/api/meeting-type/list");

async function handleDeleteMeetingType(meetingTypeId: number) {
  isLoading.value = true;
  try {
    // send payload to api endpoint
    await $fetch(`/api/meeting-type/delete/${meetingTypeId}`, {
      method: "DELETE",
    });

    toast.add({
      title: "Meeting type deleted successfully!",
      color: "success",
    });

    // refetch the meetings list
    await refresh();
  }
  catch (err: any) {
    console.error("Meeting Type Deletion Error", err);
    const formError = err instanceof ZodError
      ? err.issues[0].message
      : err.message || "An error occurred";

    return toast.add({
      title: "Failed to delete meeting type",
      description: formError,
      icon: "i-lucide-triangle-alert",
      color: "error",
    });
  }
  finally {
    isLoading.value = false;
  }
}

// function needed to build the dropdown item list
// while inside the meetingType for loop
// to access the unique slug name
function createDropdownItems(slugName: string, meetingTypeId: number) {
  const link = `/${authStore.user?.linkName}/${slugName}`;
  return [
    {
      label: "Options",
      type: "label",
    },
    { type: "separator" },
    {
      label: "Preview",
      icon: "i-lucide-external-link",
      to: link,
    },
    {
      label: "Copy Link",
      icon: "i-lucide-link",
      class: "cursor-pointer",
      onSelect: () => {
        // copy meeting link to clipboard
        navigator.clipboard.writeText(window.location.origin + link);
        toast.add({
          title: "Copied Link to Meeting",
          color: "success",
          icon: "i-lucide-copy",
        });
      },
    },
    {
      label: "Edit",
      icon: "i-lucide-pen",
      to: `/dashboard/meeting-types/edit/${meetingTypeId}`,
    },
    { type: "separator" },
    {
      label: "Delete",
      icon: "lucide:trash-2",
      color: "error",
      onSelect: () => {
        handleDeleteMeetingType(meetingTypeId);
      },
    },
  ];
}
</script>

<template>
  <div class="h-full w-full">
    <div v-if="pending || !authStore.user || !meetingTypes">
      <LoadingSpinner />
    </div>
    <template v-else-if="meetingTypes?.length === 0">
      <EmptyState
        title="You have no meeting types"
        icon="i-lucide-ban"
        description="Create your first meeting type by clicking the button below."
        button-text="Add meeting type"
        href="/dashboard/meeting-types/create"
      />
    </template>
    <div v-else>
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold">
                Meeting Types
              </h1>
              <p class="text-neutral-500 text-base mt-1">
                Create and manage your types of meetings
              </p>
            </div>
            <UButton to="/dashboard/meeting-types/create" size="xl" class="hidden lg:flex">
              Create New Meeting
            </UButton>
          </div>
        </template>
        <!-- List of Meeting Types -->
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(meet, index) in meetingTypes"
            :key="index"
            class="overflow-hidden rounded-lg relative border border-accented/60 shadow-xs"
          >
            <div class="absolute top-2 right-2">
              <!-- Lazy load to make sure the user.id is up to date in :items function call -->
              <LazyUDropdownMenu
                hydrate-on-interaction="mouseover"
                :items="createDropdownItems(meet.slug, meet.id)"
                :content="{ align: 'end' }"
              >
                <UButton icon="i-lucide-settings" variant="soft" size="md" />
              </LazyUDropdownMenu>
            </div>
            <NuxtLink :to="`/${authStore.user?.linkName}/${meet.slug}`" class="flex items-center p-5 ">
              <div class="flex-shrink-0">
                <UIcon name="i-lucide-calendar-cog" class="size-6" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-neutral-400">
                    {{ meet.duration }} Minutes
                  </dt>
                  <dd class="text-lg font-medium">
                    {{ meet.title }}
                  </dd>
                </dl>
              </div>
            </NuxtLink>
            <div class="bg-elevated/60 flex px-4 py-3 justify-between items-center">
              <IsActiveSwitch
                :initial-checked="meet.isActive"
                :meeting-type-id="meet.id"
                :refresh-meeting-types="refresh"
              />
              <UButton size="lg" :to="`/dashboard/meeting-types/edit/${meet.id}`">
                Edit
              </UButton>
            </div>
          </div>
        </div>
        <UButton to="/dashboard/meeting-types/create" size="xl" block class="flex lg:hidden mt-5">
          Create New Meeting
        </UButton>
      </UCard>
    </div>
  </div>
</template>
