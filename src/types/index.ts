
export interface BaseProps<T> {
    label?: string;
    modelValue?: T;
    inline?: boolean;
    error?: string;
}

export interface BaseEmits<T> {
    (evt: 'update:modelValue', value: T): void;
}

export const getBasicProps = <T>(modelValue: T) => {
    return {
        label: {
            type: String,
            default: '',
        },
        inline: {
            type: Boolean,
            default: false,
        },
        error: {
            type: String,
            required: false,
        },
        modelValue: {
            type: modelValue,
            required: false,
        }
    };
}