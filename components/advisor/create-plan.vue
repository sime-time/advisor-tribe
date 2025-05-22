<script setup lang="ts">
const props = defineProps<{
	userId: string;
}>();

// const { data: advisorId } = await useFetch(`/api/advisors/get-id/${props.userId}`);
</script>

<template>
	<UCard>
		<UForm>
			<UButton type="submit">
				Create New Plan
			</UButton>
		</UForm>
	</UCard>
</template>
