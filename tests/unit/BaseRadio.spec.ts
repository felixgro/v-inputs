import BaseRadio from '@/components/BaseRadio.vue';
import { mount } from '@vue/test-utils';

describe('BaseRadio', () => {
    test('can render with value props', () => {
        const wrapper = mount(BaseRadio, {
            props: { value: '20mb' }
        });

        expect(wrapper.find('input').isVisible()).toBe(true);
        expect(wrapper.find('input').attributes('value')).toBe('20mb');
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
            props: { label: 'label', value: 1 }
        });

        const label = wrapper.find('label');
        const labelSpan = wrapper.find('span');
        const radioId = wrapper.find('input[type="radio"]').attributes('id');

        expect(labelSpan.isVisible()).toBe(true);
        expect(labelSpan.text()).toBe('label');
        expect(label.attributes('for')).toBe(radioId);
    });

    test('can bind additional attributes to input', () => {
        const wrapper = mount(BaseRadio, {
            props: { 'aria-hidden': 'true', value: 1 }
        });

        expect(wrapper.find('input[type="radio"]').attributes('aria-hidden')).toBe('true');
    });
});