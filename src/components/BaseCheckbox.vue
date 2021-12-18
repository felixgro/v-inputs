<script lang="ts" setup>
import FieldError from '@/components/FieldError.vue';
import useInputListener from '@/composables/useInputListener';
import useLayoutStyle from '@/composables/useLayoutStyle';
import useUID from '@/composables/useUID';

const props = defineProps<{
	label?: string;
	inline?: boolean;
	error?: string;
	modelValue?: boolean;
}>();

const emits = defineEmits<{
	(evt: 'update:modelValue', value: boolean): void;
}>();

const id = useUID();
const style = useLayoutStyle(props);
const emitModelUpdate = useInputListener((target) => {
	emits('update:modelValue', target.checked);
});
</script>

<template>
	<label :for="id" :style="style">
		<input
			:id="id"
			:checked="props.modelValue"
			@change="emitModelUpdate"
			:aria-describedby="
				props.error ? `${id}-error` : undefined
			"
			type="checkbox"
			:aria-invalid="!!props.error"
			v-bind="$attrs"
		/>
		<span v-if="label">{{ label }}</span>
	</label>
	<FieldError :id="`${id}-error`" :error="props.error" />
</template>
