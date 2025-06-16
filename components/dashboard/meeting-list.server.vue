<script setup lang="ts">
import { auth } from "~/lib/auth";
import { nylas } from "~/lib/nylas";
import { GrantSchema } from "~/validation/grant-schema";

// get user session data
const reqHeaders = useRequestHeaders();
const session = await auth.api.getSession({
  headers: new Headers(reqHeaders),
});

try {
  const validBody = GrantSchema.parse({
    grantId: session?.user.grantId,
    grantEmail: session?.user.grantEmail,
  });

  const meetings = await nylas.events.list({
    identifier: validBody.grantId,
    queryParams: {
      calendarId: validBody.grantEmail,
    },
  });

  console.log("meetings.data", meetings.data);
}
catch (err) {
  console.error("Error returning meeting list", err);
}
</script>

<template>
  <main>
    <h1>server component</h1>
    <p>{{ session }}</p>
  </main>
</template>
