import BaseTextarea from '@/components/BaseTextarea.vue';
import { mount } from '@vue/test-utils';

describe('BaseTextArea', () => {
    test('can render without props', () => {
        const wrapper = mount(BaseTextarea);
        expect(wrapper.find('textarea').isVisible()).toBe(true);
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

        const inputId = wrapper.find('textarea').attributes('id');

        expect(wrapper.find('label').text()).toBe('test-label');
        expect(wrapper.find('label').attributes('for')).toBe(inputId);
    });

    test('can render an accessible error', () => {
        const wrapper = mount(BaseTextarea, {
            props: { error: 'oops' }
        });

        const errorElement = wrapper.find('small');
        const textareaElement = wrapper.find('textarea');

        expect(errorElement.exists()).toBe(true);
        expect(errorElement.text()).toBe('oops');
        expect(textareaElement.attributes('aria-invalid')).toBe('true');
        expect(textareaElement.attributes('aria-describedby')).toBe(errorElement.attributes('id'));
    });

    test('can bind additional attributes to input', () => {
        const wrapper = mount(BaseTextarea, {
            props: { 'aria-hidden': 'true' }
        });

        expect(wrapper.find('textarea').attributes('aria-hidden')).toBe('true');
    });

    test('can be inline displayed', () => {
        const wrapper = mount(BaseTextarea, {
            props: {
                label: 'test-label',
                inline: true
            }
        });

        expect(wrapper.find('label').attributes('style')).toContain('display: inline-block');
        expect(wrapper.find('textarea').attributes('style')).toContain('display: inline-block');
    });
});