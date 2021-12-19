import BaseSelect from '@/components/BaseSelect.vue';
import { mount } from '@vue/test-utils';

const options = {
    1: 'optionA',
    2: 'optionB',
    3: 'optionC'
}

describe('BaseSelect', () => {
    test('can render with options property', () => {
        const wrapper = mount(BaseSelect, {
            props: { options }
        });

        expect(wrapper.find('select').isVisible()).toBe(true);
        wrapper.findAll('option').forEach((wrappedOption, idx) => {
            expect(wrappedOption.attributes('value')).toBe(`${idx + 1}`);
        });
    });

    test('works with v-model', () => {
        const wrapper = mount(BaseSelect, {
            props: { modelValue: 3, options }
        });

        const selectElement = wrapper.find('select');
        selectElement?.setValue(2);

        const updateEvents = wrapper.emitted('update:modelValue') as string[][];

        expect(updateEvents.length).toBe(1);
        expect(updateEvents![0][0]).toBe('2');
    });

    test('can render an accessible label', () => {
        const wrapper = mount(BaseSelect, {
            props: { label: 'label', options }
        });

        const selectId = wrapper.find('select').attributes('id');

        expect(wrapper.find('label').text()).toBe('label');
        expect(wrapper.find('label').attributes('for')).toBe(selectId);
    });

    test('can render an accessible error', () => {
        const wrapper = mount(BaseSelect, {
            props: { error: 'error', options }
        });

        const select = wrapper.find('select');
        const error = wrapper.find('[aria-label="Error"]');
        const errorId = error.attributes('id');

        expect(error.exists()).toBe(true);
        expect(error.text()).toBe('error');
        expect(select.attributes('aria-invalid')).toBe('true');
        expect(select.attributes('aria-describedby')).toBe(errorId);
        expect(select.attributes('aria-errormessage')).toBe(errorId);
    });

    test('can bind additional attributes to inputs', () => {
        const wrapper = mount(BaseSelect, {
            props: { 'aria-hidden': 'true', options }
        });

        expect(wrapper.find('select').attributes('aria-hidden')).toBe('true');
    });
});