<template>
	<UModal
		title="Advisor Tribe"
		description="Select which account calendar you want to use."
	>
		<!-- This slot is where the button should be -->
		<slot />

		<template #body>
			<div class="space-y-3">
				<OauthGoogleButton class="w-full justify-center" />
				<OauthMicrosoftButton class="w-full justify-center " />
			</div>
		</template>
	</UModal>
</template>
