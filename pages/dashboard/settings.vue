<script setup lang="ts">
import { z, ZodError } from "zod/v4";
import { useAuthStore } from "~/stores/auth-store";

definePageMeta({
  layout: "dashboard-layout",
});
const config = useRuntimeConfig();
const authStore = useAuthStore();

const SettingsSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters").optional(),
  email: z.email({ error: "Must submit a valid email" }).optional(),
  linkName: z
    .string()
    .min(3, "Link name must have at least 3 characters")
    .regex(/^[a-z0-9-]+$/i, "Link name can only contain letters, numbers, and - (dash)")
    .optional(),
});
type SettingsSchema = z.infer<typeof SettingsSchema>;

const formState = reactive({
  name: "",
  email: "",
  linkName: "",
});

const allFieldsEmpty = computed(() => {
  if (!formState.name && !formState.email && !formState.linkName) {
    return true;
  }
  return false;
});

const isLoading = ref(false);
const toast = useToast();

async function onSubmit() {
  isLoading.value = true;
  try {
    if (allFieldsEmpty.value) {
      throw new Error("All fields are empty. Nothing to update.");
    }

    // filter out empty values before validation
    const filledFields = Object.fromEntries(
      Object.entries(formState).filter(([_, value]) => value !== ""),
    );

    // validate only the non-empty inputs
    const validForm = SettingsSchema.parse(filledFields);

    // this json body will be sent to the api
    const body = {
      ...validForm,
      id: authStore.user?.id,
    };

    // send payload to api endpoint
    await $fetch("/api/user/update", {
      method: "POST",
      body,
    });

    toast.add({
      title: "Settings saved!",
      description: "It might take a few minutes to show changes.",
      color: "success",
    });

    // refresh the authStore cache
  }
  catch (err: any) {
    console.log("Settings Form Error", err);
    const formError = err instanceof ZodError
      ? err.issues[0].message || "Invalid input"
      : err.message || "An error occurred";

    return toast.add({
      title: "Failed to update settings",
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
      <h1 class="text-3xl font-bold">
        Settings
      </h1>
      <p class="text-neutral-500 text-base mt-1">
        Manage your account settings
      </p>
    </template>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <UFormField label="Name" name="name">
        <UInput v-model="formState.name" size="lg" :placeholder="authStore.user?.name" class="flex" />
      </UFormField>
      <UFormField label="Email" name="email">
        <UInput v-model="formState.email" size="lg" :placeholder="authStore.user?.email" class="flex" />
      </UFormField>
      <UFormField label="Share link" name="linkName">
        <UButtonGroup size="lg" class="flex">
          <UButton color="neutral" variant="subtle" as="label" class="cursor-default w-fit text-neutral-500 text-nowrap">
            {{ `${config.public.baseURL}/` }}
          </UButton>
          <UInput v-model="formState.linkName" :placeholder="authStore.user?.linkName" />
        </UButtonGroup>
      </UFormField>

      <UButton type="submit" size="xl" class="mt-1" block :loading="isLoading" :disabled="allFieldsEmpty">
        Save Changes
      </UButton>
    </form>
  </UCard>
</template>
