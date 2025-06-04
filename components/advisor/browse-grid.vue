<script setup lang="ts">
import type { AdvisorUser } from "~/db/queries/types";

defineProps<{
  advisors: AdvisorUser[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-7">
    <div v-for="advisor in advisors" :key="advisor.id">
      <AdvisorBrowseCard :advisor="advisor" />
    </div>
  </div>
</template>
