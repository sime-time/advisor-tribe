<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();

// function needed to build the dropdown item list
// while inside the meetingType for loop
// to access the unique slug name
function createDropdownItems(slugName: string) {
  return [
    {
      label: "Options",
      type: "label",
    },
    { type: "separator" },
    {
      label: "Preview",
      icon: "i-lucide-external-link",
      to: `/${authStore.user?.linkName}/${slugName}`,
    },
    {
      label: "Copy",
      icon: "i-lucide-copy",
    },
    {
      label: "Edit",
      icon: "i-lucide-pen",
    },
    { type: "separator" },
    {
      label: "Delete",
      icon: "lucide:trash-2",
      color: "error",
    },
  ];
}

interface MeetingType {
  slug: string;
  duration: number;
  title: string;
  isActive: boolean;
}

// make useFetch reactive to authStore.user.id by making it a return function
const { data: meetingTypes, pending } = await useFetch<MeetingType[]>(
  () => `/api/meeting-type/${authStore.user?.id}`,
  {
    lazy: true,
    // only fetch when user.id is available
    immediate: !!authStore.user?.id,
    // retrigger the fetch when the user.id changes
    watch: [() => authStore.user?.id],
  },
);
</script>

<template>
  <div v-if="pending || !authStore.user">
    <LoadingSpinner />
  </div>
  <template v-else-if="!meetingTypes">
    <EmptyState
      title="You have no meeting types"
      icon="i-lucide-ban"
      description="Create your first meeting type by clicking the button below."
      button-text="Add meeting type"
      href="/dashboard/add-meeting-type"
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
          <UButton to="/dashboard/add-meeting-type" size="xl" class="hidden lg:flex">
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
              :items="createDropdownItems(meet.slug)"
              :content="{ align: 'end' }"
            >
              <UButton icon="i-lucide-settings" variant="soft" size="sm" />
            </LazyUDropdownMenu>
          </div>
          <NuxtLink :to="`/${authStore.user?.linkName}/${meet.slug}`" class="flex items-center p-5 ">
            <div class="flex-shrink-0">
              <UIcon name="i-lucide-users-round" class="size-6" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-neutral-400">
                  {{ meet.duration }} Minute Meeting
                </dt>
                <dd class="text-lg font-medium">
                  {{ meet.title }}
                </dd>
              </dl>
            </div>
          </NuxtLink>
          <div class="bg-elevated/60 flex px-4 py-3 justify-between items-center">
            <USwitch :default-value="meet.isActive" />
            <UButton size="lg">
              Edit
            </UButton>
          </div>
        </div>
      </div>
      <UButton to="/dashboard/add-meeting-type" size="xl" block class="flex lg:hidden mt-5">
        Create New Meeting
      </UButton>
    </UCard>
  </div>
</template>
