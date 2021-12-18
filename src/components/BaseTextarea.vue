<script lang="ts" setup>
import FieldError from './FieldError.vue';
import useInputListener from '@/composables/useInputListener';
import useLayoutStyle from '@/composables/useLayoutStyle';
import useUID from '@/composables/useUID';

const props = defineProps<{
	label?: string;
	modelValue?: string;
	inline?: boolean;
	error?: string;
}>();

const emits = defineEmits<{
	(evt: 'update:modelValue', value: string): void;
}>();

const id = useUID();
const style = useLayoutStyle(props);
const emitModelUpdate = useInputListener((target) => {
	emits('update:modelValue', target.value);
});
</script>

<template>
	<label v-if="label" :for="id" :style="style">{{ label }}</label>
	<textarea
		:id="id"
		:value="modelValue"
		:style="style"
		@input="emitModelUpdate"
		:aria-describedby="error ? `${id}-error` : undefined"
		:aria-invalid="!!error"
		v-bind="$attrs"
	></textarea>
	<FieldError :id="`${id}-error`" :error="error" />
</template>
