<template>
	<UModal
		title="AdvisorTribe"
		description="Select which account's calendar you want to use."
	>
		<!-- This slot is where the button should be -->
		<slot />

		<template #body>
			<div class="space-y-3">
				<AuthGoogleButton class="w-full justify-center" />
				<AuthMicrosoftButton class="w-full justify-center " />
			</div>
		</template>
	</UModal>
</template>
