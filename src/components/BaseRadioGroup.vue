<script lang="ts" setup>
import BaseRadio from './BaseRadio.vue';
import FieldError from './FieldError.vue';
import useLayoutStyle from '../composables/useLayoutStyle';
import useUID from '../composables/useUID';

const props = defineProps<{
	label?: string;
	modelValue?: string | number;
	options: Record<string | number, string>;
	name: string;
	inline?: boolean;
	error?: string;
}>();

const id = useUID();
const style = useLayoutStyle(props);
</script>

<template>
	<label v-if="label" :id="id" :style="style">
		{{ label }}
	</label>

	<BaseRadio
		v-for="[key, value] in Object.entries(options)"
		:key="key"
		:value="key"
		:label="value"
		:modelValue="modelValue"
		:name="name"
		@update:modelValue="$emit('update:modelValue', $event)"
		:aria-describedby="error ? `${id}-error` : null"
		:aria-labeledby="id"
		:inline="props.inline"
		v-bind="$attrs"
	/>

	<FieldError :id="`${id}-error`" :error="error" />
</template>
