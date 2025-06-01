<script setup lang="ts">
const formState = reactive({
	firstName: "",
	lastName: "",
	linkName: "",
});

const name = computed(() => {
	return `${formState.firstName.trim()} ${formState.lastName.trim()}`;
});
</script>

<template>
	<div class="h-screen w-screen flex justify-center items-start px-1">
		<UCard class="mt-20">
			<template #header>
				<h1 class="text-3xl font-bold">
					Welcome to Advisor<span class="text-primary-600">Tribe</span>
				</h1>
				<p class="text-neutral-500 text-base">
					We need the following information to set up your profile.
				</p>
			</template>

			<UForm class="grid gap-y-5">
				<div class="flex gap-5">
					<UFormField label="First Name" name="firstName">
						<UInput v-model="formState.firstName" size="lg" class="w-full" />
					</UFormField>
					<UFormField label="Last Name" name="lastName">
						<UInput v-model="formState.lastName" size="lg" class="w-full" />
					</UFormField>
				</div>
				<UFormField label="Share link" name="linkName">
					<UButtonGroup size="lg" class="flex">
						<UButton color="neutral" variant="subtle" as="label" class="cursor-default w-fit text-neutral-500 text-nowrap">
							https://advisor-tribe.com/
						</UButton>
						<UInput v-model="formState.linkName" class="flex-grow" :placeholder="`${formState.firstName}-${formState.lastName}`" />
					</UButtonGroup>
				</UFormField>
				<UButton type="submit" size="lg" class="flex justify-center mt-2">
					Continue
				</UButton>
			</UForm>
		</UCard>
	</div>
</template>
