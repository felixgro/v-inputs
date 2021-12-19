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

        const allRadios = wrapper.findAll('input[type="radio"]');

        expect(allRadios.length).toBe(3);
        allRadios.forEach((wrappedInput, idx) => {
            expect(wrappedInput.attributes('name')).toBe('test-radio-group');
            expect(wrappedInput.attributes('value')).toBe(`${idx + 1}`);
        });
    });

    test('works with v-model', () => {
        const wrapper = mount(BaseRadioGroup, {
            props: { modelValue: 3, name: 'test', options }
        });

        wrapper.find('input[type="radio"]').trigger('click');

        const updateEvents = wrapper.emitted('update:modelValue') as string[][];
        expect(updateEvents.length).toBe(1);
        expect(updateEvents![0][0]).toBe('1');
    });

    test('can render an accessible label', () => {
        const wrapper = mount(BaseRadioGroup, {
            props: { label: 'label', name: 'test-radio', options }
        });

        const labelId = wrapper.find('label').attributes('id');

        wrapper.findAll('input[type="radio"]').forEach(wrappedInput => {
            expect(wrappedInput.attributes('aria-labeledby')).toBe(labelId);
        });
    });

    test('can render an accessible error', () => {
        const wrapper = mount(BaseRadioGroup, {
            props: { error: 'error', name: 'test-radio', options }
        });

        const radios = wrapper.findAll('input[type="radio"]');
        const error = wrapper.find('[aria-label="Error"]');
        const errorId = error.attributes('id');

        expect(error.exists()).toBe(true);
        expect(error.html()).toContain('error');
        radios.forEach(wrappedRadio => {
            expect(wrappedRadio.attributes('aria-describedby')).toBe(errorId);
            expect(wrappedRadio.attributes('aria-invalid')).toBe('true');
            expect(wrappedRadio.attributes('aria-describedby')).toBe(errorId);
            expect(wrappedRadio.attributes('aria-errormessage')).toBe(errorId);
        });
    });

    test('can bind additional attributes to inputs', () => {
        const wrapper = mount(BaseRadioGroup, {
            props: { name: 'test', 'aria-hidden': 'true', options }
        });

        wrapper.findAll('input[type="radio"]').forEach(wrappedRadio => {
            expect(wrappedRadio.attributes('aria-hidden')).toBe('true');
        });
    });
});