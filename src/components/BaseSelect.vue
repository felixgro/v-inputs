<script lang="ts" setup>
import FieldError from './FieldError.vue';
import useBaseField from '@/composables/useBaseField';

const props = defineProps<{
	label?: string;
	modelValue?: string | number;
	options: Record<string | number, string | number>;
	inline?: boolean;
	error?: string;
}>();

const emits = defineEmits<{
	(evt: 'update:modelValue', value: string): void;
}>();

const select = useBaseField(props, (e: Event) => {
	const target = e.target as HTMLSelectElement;
	emits('update:modelValue', target.value);
});
</script>

<template>
	<label v-if="label" :for="select.id">{{ label }}</label>
	<select
		:value="modelValue"
		:style="select.style"
		:id="select.id"
		@change="select.updateHandler"
		v-bind="{ ...select.ariaAttrs, ...$attrs }"
	>
		<option
			v-for="[key, value] in Object.entries(options)"
			:value="key"
			:key="key"
			:selected="value === modelValue"
		>
			{{ value }}
		</option>
	</select>
	<FieldError :error="error" :id="select.errorId" />
</template>
