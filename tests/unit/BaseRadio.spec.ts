import BaseRadio from '@/components/BaseRadio.vue';
import { mockConsole } from '../setup/browserMocks';
import { mount } from '@vue/test-utils';

describe('BaseRadio', () => {
    test('can render with value property', () => {
        const console = mockConsole();
        const wrapper = mount(BaseRadio, {
            props: { value: '20mb' }
        });

        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
        expect(wrapper.find('input').isVisible()).toBe(true);
        expect(wrapper.find('input').attributes('value')).toBe('20mb');
    });

    test('warns when rendered without value', () => {
        const { warn } = mockConsole();
        const wrapper = mount(BaseRadio);

        expect(warn).toHaveBeenCalled();
        expect(wrapper.find('input').isVisible()).toBe(true);
    });

    test('works with v-model', () => {
        const wrapper = mount(BaseRadio, {
            props: { modelValue: 1, value: 'test-radio' }
        });

        wrapper.find('input').trigger('click');
        const updateEvents = wrapper.emitted('update:modelValue') as string[][];

        expect(updateEvents.length).toBe(1);
        expect(updateEvents![0][0]).toBe('test-radio');
    });

    test('can render an accessible label', () => {
        const wrapper = mount(BaseRadio, {
            props: { label: 'test-label', value: 'test-radio' }
        });

        const inputId = wrapper.find('input').attributes('id');

        expect(wrapper.find('label').text()).toBe('test-label');
        expect(wrapper.find('label').attributes('for')).toBe(inputId);
    });

    test('can bind additional attributes to input', () => {
        const wrapper = mount(BaseRadio, {
            props: { 'aria-hidden': 'true' }
        });

        expect(wrapper.find('input').attributes('aria-hidden')).toBe('true');
    });

    test('can be inline displayed', () => {
        const wrapper = mount(BaseRadio, {
            props: {
                label: 'test-label',
                inline: true
            }
        });

        expect(wrapper.find('label').attributes('style')).toContain('display: inline-block');
    });
});