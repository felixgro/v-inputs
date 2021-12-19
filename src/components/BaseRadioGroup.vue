<script lang="ts" setup>
import BaseRadio from './BaseRadio.vue';
import FieldError from './FieldError.vue';
import useBaseField from '@/composables/useBaseField';

const props = defineProps<{
	label?: string;
	modelValue?: string | number;
	options: Record<string | number, string>;
	name: string;
	inline?: boolean;
	error?: string;
}>();

const emits = defineEmits<{
	(evt: 'update:modelValue', value: string | number): void;
}>();

const radioGroup = useBaseField(props, (e: any) => {
	emits('update:modelValue', e as string | number);
});
</script>

<template>
	<label v-if="label" :id="radioGroup.id">
		{{ label }}
	</label>

	<BaseRadio
		v-for="[key, value] in Object.entries(options)"
		:key="key"
		:name="name"
		:value="key"
		:label="value"
		:modelValue="modelValue"
		@update:modelValue="$emit('update:modelValue', $event)"
		:inline="props.inline"
		v-bind="{
			'aria-labeledby': radioGroup.id,
			...radioGroup.ariaAttrs,
			...$attrs,
		}"
	/>

	<FieldError :error="error" :id="radioGroup.errorId" />
</template>
