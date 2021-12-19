<script lang="ts" setup>
import FieldError from './FieldError.vue';
import useBaseField from '@/composables/useBaseField';

const props = defineProps<{
	label?: string;
	modelValue?: string | number;
	inline?: boolean;
	error?: string;
}>();

const emits = defineEmits<{
	(evt: 'update:modelValue', value: string | number): void;
}>();

const input = useBaseField(props, (e: Event) => {
	const target = e.target as HTMLInputElement;
	emits('update:modelValue', target.value);
});
</script>

<template>
	<label v-if="label" :for="input.id">
		{{ label }}
	</label>
	<input
		:id="input.id"
		:value="modelValue"
		:style="input.style"
		@input="input.updateHandler"
		v-bind="{ ...input.ariaAttrs, ...$attrs }"
	/>
	<FieldError :label="label" :error="error" :id="input.errorId" />
</template>
