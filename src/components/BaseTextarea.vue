<script lang="ts" setup>
import FieldError from './FieldError.vue';
import useBaseField from '@/composables/useBaseField';

const props = defineProps<{
	label?: string;
	modelValue?: string;
	inline?: boolean;
	error?: string;
}>();

const emits = defineEmits<{
	(evt: 'update:modelValue', value: string): void;
}>();

const textarea = useBaseField(props, (e: Event) => {
	const target = e.target as HTMLTextAreaElement;
	emits('update:modelValue', target.value);
});
</script>

<template>
	<label v-if="label" :for="textarea.id">{{ label }}</label>
	<textarea
		:id="textarea.id"
		:value="modelValue"
		:style="textarea.style"
		@input="textarea.updateHandler"
		v-bind="{
			...textarea.ariaAttrs,
			...$attrs,
		}"
	></textarea>
	<FieldError :id="textarea.errorId" :error="error" />
</template>
