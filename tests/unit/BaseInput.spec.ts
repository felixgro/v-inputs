import BaseInput from '@/components/BaseInput.vue';
import { mount } from '@vue/test-utils';

describe('BaseInput', () => {
    test('can render without props', () => {
        const wrapper = mount(BaseInput);
        expect(wrapper.find('input').isVisible()).toBe(true);
        expect(wrapper.find('label').exists()).toBe(false);
        expect(wrapper.find('[aria-label="Error"]').attributes('aria-hidden')).toBe('true');
    });

    test('works with v-model', () => {
        const wrapper = mount(BaseInput, {
            props: { modelValue: 'Hello' }
        });

        wrapper.find('input').setValue('Hello World!');
        const updateEvents = wrapper.emitted('update:modelValue') as string[][];

        expect(updateEvents.length).toBe(1);
        expect(updateEvents![0][0]).toBe('Hello World!');
    });

    test('can render an accessible label', () => {
        const wrapper = mount(BaseInput, {
            props: { label: 'test-label' }
        });

        const label = wrapper.find('label');
        const inputId = wrapper.find('input').attributes('id');

        expect(label.isVisible()).toBe(true);
        expect(label.text()).toBe('test-label');
        expect(label.attributes('for')).toBe(inputId);
    });

    test('can render an accessible error', () => {
        const wrapper = mount(BaseInput, {
            props: { error: 'error message' }
        });

        const input = wrapper.find('input');
        const error = wrapper.find('[aria-label="Error"]');
        const errorId = error.attributes('id');

        expect(error.exists()).toBe(true);
        expect(error.text()).toBe('error message');
        expect(input.attributes('aria-invalid')).toBe('true');
        expect(input.attributes('aria-describedby')).toBe(errorId);
        expect(input.attributes('aria-errormessage')).toBe(errorId);
    });

    test('can bind additional attributes to input', () => {
        const wrapper = mount(BaseInput, {
            props: { 'aria-hidden': 'true' }
        });

        expect(wrapper.find('input').attributes('aria-hidden')).toBe('true');
    });
});