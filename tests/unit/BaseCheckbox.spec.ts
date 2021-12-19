import BaseCheckbox from '@/components/BaseCheckbox.vue';
import { mount } from '@vue/test-utils';

describe('BaseCheckbox', () => {
    test('can render without props', () => {
        const wrapper = mount(BaseCheckbox);
        expect(wrapper.find('input[type="checkbox"]').isVisible()).toBe(true);
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('span').exists()).toBe(false);
        expect(wrapper.find('[aria-label="Error"]').attributes('aria-hidden')).toBe('true');
    });

    test('works with v-model', () => {
        const wrapper = mount(BaseCheckbox, {
            props: { modelValue: false }
        });

        wrapper.find('input').trigger('click'); // true
        wrapper.find('input').trigger('click'); // false
        wrapper.find('input').trigger('click'); // true

        const updateEvents = wrapper.emitted('update:modelValue') as string[][];
        expect(updateEvents.length).toBe(3);
        expect(updateEvents![0][0]).toBe(true);
    });

    test('can render an accessible label', () => {
        const wrapper = mount(BaseCheckbox, {
            props: { label: 'test-label' }
        });

        const label = wrapper.find('label');
        const labelSpan = wrapper.find('span');
        const checkboxId = wrapper.find('input[type="checkbox"]').attributes('id');

        expect(labelSpan.isVisible()).toBe(true);
        expect(labelSpan.text()).toBe('test-label');
        expect(label.attributes('for')).toBe(checkboxId);
    });

    test('can render an accessible error', () => {
        const wrapper = mount(BaseCheckbox, {
            props: { error: 'error message' }
        });

        const textarea = wrapper.find('input[type="checkbox"]');
        const error = wrapper.find('[aria-label="Error"]');
        const errorId = error.attributes('id');

        expect(error.exists()).toBe(true);
        expect(error.text()).toBe('error message');
        expect(textarea.attributes('aria-invalid')).toBe('true');
        expect(textarea.attributes('aria-describedby')).toBe(errorId);
        expect(textarea.attributes('aria-errormessage')).toBe(errorId);
    });

    test('can bind additional attributes to input', () => {
        const wrapper = mount(BaseCheckbox, {
            props: { 'aria-hidden': 'true' }
        });

        expect(wrapper.find('input[type="checkbox"]').attributes('aria-hidden')).toBe('true');
    });
});