<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { useAuthStore } from "~/stores/auth-store";

const authStore = useAuthStore();
const avatarSrc = computed(() => authStore.user?.image || "");

const items = ref<DropdownMenuItem[]>([
  { label: "My Account", type: "label" },
  { type: "separator" },
  {
    label: "Settings",
    icon: "i-lucide-settings",
    to: "/dashboard/settings",
  },
  {
    label: "Log out",
    color: "error",
    icon: "i-lucide-log-out",
    onSelect: authStore.signOut,
  },
]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    size="xl"
    :content="{ align: 'end' }"
  >
    <UButton
      :avatar="{ src: avatarSrc }"
      variant="outline"
      color="neutral"
      size="xl"
      class="rounded-full"
    />
  </UDropdownMenu>
</template>
