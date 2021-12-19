<script lang="ts" setup>
defineProps<{
	label?: string;
	error?: string;
}>();
</script>

<template>
	<div
		v-show="error"
		aria-live="assertive"
		:aria-hidden="!error"
		:aria-label="`${label ? `${label} ` : ''}Error`"
		v-bind="$attrs"
	>
		{{ error || '\t' }}
	</div>
</template>
