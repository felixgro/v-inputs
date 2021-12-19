<script lang="ts" setup>
import useBaseField from '@/composables/useBaseField';

const props = defineProps<{
	label?: string;
	modelValue?: string | number;
	value: string | number;
	inline?: boolean;
	error?: string;
}>();

const emits = defineEmits<{
	(evt: 'update:modelValue', value: string | number): void;
}>();

const radio = useBaseField(props, (e: Event) => {
	const target = e.target as HTMLInputElement;
	emits('update:modelValue', target.value);
});
</script>

<template>
	<label :for="radio.id" :style="radio.style">
		<input
			type="radio"
			:id="radio.id"
			:value="value"
			:checked="modelValue === value"
			@change="radio.updateHandler"
			v-bind="{ ...radio.ariaAttrs, ...$attrs }"
		/>
		<span v-if="label">{{ label }}</span>
	</label>
</template>
