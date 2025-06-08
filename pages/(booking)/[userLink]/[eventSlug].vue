<script setup lang="ts">
// get the url params
const route = useRoute();
console.log("params:", route.params);
const userLink: string = route.params.userLink;
const eventSlug: string = route.params.eventSlug;

const result = await useFetch("/api/event-type/booking-data", {
  method: "POST",
  body: route.params,
});
</script>

<template>
  <div class="min-h-screen w-screen flex items-center justify-center">
    <UCard class="max-w-[1000] w-full mx-auto">
      <div class="md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
        <div>
          <NuxtImg src="" alt="" />
        </div>
      </div>
    </UCard>
  </div>
</template>
