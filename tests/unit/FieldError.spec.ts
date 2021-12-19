import FieldError from '@/components/FieldError.vue';
import { shallowMount } from '@vue/test-utils';

describe('FieldError', () => {
	test('is hidden by default', () => {
		const wrapper = shallowMount(FieldError);
		expect(wrapper.attributes('aria-hidden')).toBe("true");
	});

	test('is hidden with empty error message', () => {
		const wrapper = shallowMount(FieldError, {
			props: {
				error: '',
			}
		});

		expect(wrapper.attributes('aria-hidden')).toBe("true");
	});

	test('is visible when error is present', () => {
		const wrapper = shallowMount(FieldError, {
			props: {
				error: 'error message',
			}
		});

		expect(wrapper.html()).toContain('error message');
	});

	test('has ARIA live region', () => {
		// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
		const wrapper = shallowMount(FieldError, {
			props: {
				error: 'error message',
			}
		});

		expect(wrapper.attributes('aria-live')).toBe('assertive');
	});
});