import FieldError from '@/components/FieldError.vue';
import { shallowMount } from '@vue/test-utils';

describe('FieldError', () => {
	test('is hidden by default', () => {
		const wrapper = shallowMount(FieldError);
		expect(wrapper.html()).toBe("<!--v-if-->");
	});

	test('is hidden with empty error message', () => {
		const wrapper = shallowMount(FieldError, {
			props: {
				error: '',
			}
		});

		expect(wrapper.html()).toBe("<!--v-if-->");
	});

	test('is visible when error is present', () => {
		const wrapper = shallowMount(FieldError, {
			props: {
				error: 'error message',
			}
		});

		expect(wrapper.find('small').text()).toBe('error message');
	});

	test('has ARIA live region', () => {
		// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
		const wrapper = shallowMount(FieldError, {
			props: {
				error: 'error message',
			}
		});

		expect(wrapper.find('small').attributes('aria-live')).toBe('assertive');
	});
});