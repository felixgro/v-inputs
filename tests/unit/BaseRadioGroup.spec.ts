import BaseRadioGroup from '@/components/BaseRadioGroup.vue';
import { mount } from '@vue/test-utils';

const options = {
    1: 'optionA',
    2: 'optionB',
    3: 'optionC'
}

describe('BaseRadioGroup', () => {
    test('can render with name and options properties', () => {
        const wrapper = mount(BaseRadioGroup, {
            props: { name: 'test-radio-group', options }
        });

        expect(wrapper.findAll('input').length).toBe(3);

        wrapper.findAll('input').forEach((wrappedInput, idx) => {
            expect(wrappedInput.attributes('name')).toBe('test-radio-group');
            expect(wrappedInput.attributes('type')).toBe('radio');
            expect(wrappedInput.attributes('value')).toBe(`${idx + 1}`);
        });
    });

    test('works with v-model', () => {
        const wrapper = mount(BaseRadioGroup, {
            props: { modelValue: 3, name: 'test', options }
        });

        const inputElement = wrapper.find('input');
        inputElement?.trigger('click');

        const updateEvents = wrapper.emitted('update:modelValue') as string[][];

        expect(updateEvents.length).toBe(1);
        expect(updateEvents![0][0]).toBe('1');
    });

    test('can render an accessible label', () => {
        const wrapper = mount(BaseRadioGroup, {
            props: { label: 'label', name: 'test-radio', options }
        });

        const labelId = wrapper.find('label').attributes('id');

        wrapper.findAll('input').forEach(wrappedInput => {
            expect(wrappedInput.attributes('aria-labeledby')).toBe(labelId);
        });
    });

    test('can bind additional attributes to inputs', () => {
        const wrapper = mount(BaseRadioGroup, {
            props: { name: 'test', 'aria-hidden': 'true', options }
        });

        wrapper.findAll('input').forEach(wrappedInput => {
            expect(wrappedInput.attributes('aria-hidden')).toBe('true');
        });
    });

    test('can be inline displayed', () => {
        const wrapper = mount(BaseRadioGroup, {
            props: { name: 'test', inline: true, options }
        });

        expect(wrapper.find('label').attributes('style')).toContain('display: inline-block');
    });
});