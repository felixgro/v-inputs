import BaseCheckbox from '@/components/BaseCheckbox.vue';
import { mount } from '@vue/test-utils';

describe('BaseCheckbox', () => {
    test('can render without props', () => {
        const wrapper = mount(BaseCheckbox);
        expect(wrapper.find('input').isVisible()).toBe(true);
        expect(wrapper.find('span').exists()).toBe(false);
        expect(wrapper.find('small').exists()).toBe(false);
    });

    test('works with v-model', () => {
        const wrapper = mount(BaseCheckbox, {
            props: { modelValue: false }
        });

        wrapper.find('input').trigger('click');
        wrapper.find('input').trigger('click');

        const updateEvents = wrapper.emitted('update:modelValue') as number[][];

        expect(updateEvents.length).toBe(2);
        expect(updateEvents[0][0]).toBe(true);
        expect(updateEvents[1][0]).toBe(false);
    });

    test('can render an accessible label', () => {
        const wrapper = mount(BaseCheckbox, {
            props: { label: 'test-label' }
        });

        const inputId = wrapper.find('input').attributes('id');

        expect(wrapper.find('span').text()).toBe('test-label');
        expect(wrapper.find('label').attributes('for')).toBe(inputId);
    });

    test('can render an accessible error', () => {
        const wrapper = mount(BaseCheckbox, {
            props: { error: 'oops' }
        });

        const errorElement = wrapper.find('small');
        const inputElement = wrapper.find('input');

        expect(errorElement.exists()).toBe(true);
        expect(errorElement.text()).toBe('oops');
        expect(inputElement.attributes('aria-invalid')).toBe('true');
        expect(inputElement.attributes('aria-describedby')).toBe(errorElement.attributes('id'));
    });

    test('can bind additional attributes to input', () => {
        const wrapper = mount(BaseCheckbox, {
            props: { 'aria-hidden': 'true' }
        });

        expect(wrapper.find('input').attributes('aria-hidden')).toBe('true');
    });

    test('can be inline displayed', () => {
        const wrapper = mount(BaseCheckbox, {
            props: {
                label: 'test-label',
                inline: true
            }
        });

        expect(wrapper.find('label').attributes('style')).toContain('display: inline-block');
    });
});