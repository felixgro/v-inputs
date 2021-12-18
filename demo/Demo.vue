<script lang="ts" setup>
import { reactive, ref } from 'vue';

const isInline = ref<boolean>(false);
const error = ref('');

const data = reactive({
	title: 'Test Test',
	description: '',
	plan: 'free',
	storage: '10',
	setup: 'basic',
	private: false,
});

const plans = ref({
	free: 'Free',
	pro: 'Pro',
	enterprise: 'Enterprise',
});

const storageOptions = ref({
	'10': '10gb',
	'50': '50gb',
	'100': '100gb',
	'150': '150gb',
});

const setupOptions = ref({
	basic: 'Basic',
	advanced: 'Advanced',
});
</script>

<template>
	<div id="app">
		<pre>{{ JSON.stringify(data, null, 2) }}</pre>

		<form @submit.prevent>
			<BaseInput label="Show Error" v-model="error" />
			<BaseCheckbox label="isInline" v-model="isInline" />
		</form>

		<form @submit.prevent>
			<BaseInput
				label="Title"
				v-model="data.title"
				:inline="isInline"
				:error="error"
			/>
			<BaseTextarea
				label="Description"
				v-model="data.description"
				:inline="isInline"
				:error="error"
			/>
			<BaseSelect
				label="Plan"
				v-model="data.plan"
				:options="plans"
				:inline="isInline"
				:error="error"
			/>
			<BaseRadioGroup
				label="Storage"
				name="storage"
				v-model="data.storage"
				:options="storageOptions"
				:inline="isInline"
				:error="error"
			/>
			<BaseRadioGroup
				label="Setup"
				name="setup"
				v-model="data.setup"
				:options="setupOptions"
				:inline="isInline"
				:error="error"
			/>
			<BaseCheckbox
				label="Private"
				v-model="data.private"
				:inline="isInline"
				:error="error"
			/>
		</form>
	</div>
</template>

<style>
* {
	box-sizing: border-box;
}

body {
	background: #ececec;
}

form {
	position: relative;
	margin: 10px auto;
	width: 300px;
	padding: 20px;
	background: #fafafa;
}

form > label:first-of-type {
	margin-top: 0 !important;
}

form label {
	margin-top: 10px;
}

form > small {
	color: mediumvioletred;
}
</style>
