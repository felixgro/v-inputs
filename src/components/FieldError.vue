<script lang="ts" setup>
defineProps<{
	error?: string;
}>();
</script>

<template>
	<small v-if="error" v-bind="$attrs" aria-live="assertive">
		{{ error }}
	</small>
</template>
