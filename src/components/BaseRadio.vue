<script lang="ts" setup>
import useInputListener from '@/composables/useInputListener';
import useLayoutStyle from '../composables/useLayoutStyle';
import useUID from '../composables/useUID';

const props = defineProps<{
	label?: string;
	modelValue?: string | number;
	value: string | number;
	inline?: boolean;
}>();

const emits = defineEmits<{
	(evt: 'update:modelValue', value: string | number): void;
}>();

const id = useUID();
const style = useLayoutStyle(props);
const emitModelUpdate = useInputListener((target) => {
	emits('update:modelValue', target.value);
});
</script>

<template>
	<label :for="id" :style="style">
		<input
			:id="id"
			type="radio"
			:value="value"
			:checked="modelValue === value"
			@change="emitModelUpdate"
			v-bind="$attrs"
		/>
		<span v-if="label">{{ label }}</span>
	</label>
</template>
