import BaseTextarea from '@/components/BaseTextarea.vue';
import { mount } from '@vue/test-utils';

describe('BaseTextArea', () => {
    test('can render without props', () => {
        const wrapper = mount(BaseTextarea);
        expect(wrapper.find('textarea').isVisible()).toBe(true);
        expect(wrapper.find('label').exists()).toBe(false);
        expect(wrapper.find('[aria-label="Error"]').attributes('aria-hidden')).toBe('true');
    });

    test('works with v-model', () => {
        const wrapper = mount(BaseTextarea, {
            props: { modelValue: 'Hello' }
        });

        wrapper.find('textarea').setValue('Hello World!');
        const updateEvents = wrapper.emitted('update:modelValue') as string[][];

        expect(updateEvents.length).toBe(1);
        expect(updateEvents![0][0]).toBe('Hello World!');
    });

    test('can render an accessible label', () => {
        const wrapper = mount(BaseTextarea, {
            props: { label: 'test-label' }
        });

        const label = wrapper.find('label');
        const textareaId = wrapper.find('textarea').attributes('id');

        expect(label.isVisible()).toBe(true);
        expect(label.text()).toBe('test-label');
        expect(label.attributes('for')).toBe(textareaId);
    });

    test('can render an accessible error', () => {
        const wrapper = mount(BaseTextarea, {
            props: { error: 'error message' }
        });

        const textarea = wrapper.find('textarea');
        const error = wrapper.find('[aria-label="Error"]');
        const errorId = error.attributes('id');

        expect(error.exists()).toBe(true);
        expect(error.text()).toBe('error message');
        expect(textarea.attributes('aria-invalid')).toBe('true');
        expect(textarea.attributes('aria-describedby')).toBe(errorId);
        expect(textarea.attributes('aria-errormessage')).toBe(errorId);
    });

    test('can bind additional attributes to input', () => {
        const wrapper = mount(BaseTextarea, {
            props: { 'aria-hidden': 'true' }
        });

        expect(wrapper.find('textarea').attributes('aria-hidden')).toBe('true');
    });
});