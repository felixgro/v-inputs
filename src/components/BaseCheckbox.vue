<script lang="ts" setup>
import FieldError from '@/components/FieldError.vue';
import useBaseField from '@/composables/useBaseField';

const props = defineProps<{
	label?: string;
	inline?: boolean;
	error?: string;
	modelValue?: boolean;
}>();

const emits = defineEmits<{
	(evt: 'update:modelValue', value: boolean): void;
}>();

const checkbox = useBaseField(props, (e: Event) => {
	const target = e.target as HTMLInputElement;
	emits('update:modelValue', target.checked);
});
</script>

<template>
	<label :for="checkbox.id" :style="checkbox.style">
		<input
			type="checkbox"
			:id="checkbox.id"
			:checked="props.modelValue"
			@change="checkbox.updateHandler"
			v-bind="{ ...checkbox.ariaAttrs, ...$attrs }"
		/>
		<span v-if="label">{{ label }}</span>
	</label>
	<FieldError :id="checkbox.errorId" :error="props.error" />
</template>
