<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();

// function needed to build the dropdown item list
// while inside the eventType for loop
// to access the unique slug name
function createDropdownItems(slugName: string) {
  return [
    {
      label: "Event",
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
      icon: "i-lucide-trash-2",
      color: "error",
    },
  ];
}

// make useFetch reactive to authStore.user.id by making it a return function
const { data: eventTypes, pending } = await useFetch(
  () => `/api/event-type/${authStore.user?.id}`,
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
  <template v-else-if="!eventTypes">
    <EmptyState
      title="You have no Event Types"
      icon="i-lucide-ban"
      description="Create your first event type by clicking the button below."
      button-text="Add event type"
      href="/dashboard/add-event-type"
    />
  </template>
  <div v-else>
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold">
              Event Type
            </h1>
            <p class="text-neutral-500 text-base mt-1">
              Create and manage your appointment types
            </p>
          </div>
          <UButton to="/dashboard/add-event-type" size="xl">
            Create New Event
          </UButton>
        </div>
      </template>
      <!-- List of Event Types -->
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(event, index) in eventTypes"
          :key="index"
          class="overflow-hidden rounded-lg relative border border-accented/60 shadow-xs"
        >
          <div class="absolute top-2 right-2">
            <!-- Lazy load to make sure the user.id is up to date in :items function call -->
            <LazyUDropdownMenu
              hydrate-on-interaction="mouseover"
              :items="createDropdownItems(event.slug)"
              :content="{ align: 'end' }"
            >
              <UButton icon="i-lucide-settings" variant="soft" size="sm" />
            </LazyUDropdownMenu>
          </div>
          <NuxtLink to="/" class="flex items-center p-5 ">
            <div class="flex-shrink-0">
              <UIcon name="i-lucide-users-round" class="size-6" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-neutral-400">
                  {{ event.duration }} Minute Meeting
                </dt>
                <dd class="text-lg font-medium">
                  {{ event.title }}
                </dd>
              </dl>
            </div>
          </NuxtLink>
          <div class="bg-elevated/60 flex px-4 py-3 justify-between items-center">
            <USwitch />
            <UButton size="lg">
              Edit Event
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
