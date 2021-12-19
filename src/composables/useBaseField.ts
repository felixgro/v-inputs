import { computed, reactive } from 'vue';
import useLayoutStyle from '@/composables/useLayoutStyle';
import useUID from '@/composables/useUID';

interface BaseProps {
    error?: string;
    inline?: boolean;
}

type EventHandler = (event: Event) => void;
type AriaAttributes = Record<string, string | undefined>;

export default function useBaseField<P extends BaseProps>(props: P, updateHandler: EventHandler) {
    const id = useUID();
    const style = useLayoutStyle(props);

    const errorId = computed<string | undefined>(() => props.error ? `${id.value}-error` : undefined);

    const ariaAttrs = computed<AriaAttributes>(() => ({
        'aria-errormessage': errorId.value,
        'aria-describedby': errorId.value,
        'aria-invalid': props.error ? 'true' : undefined
    }));

    return reactive({ id, errorId, style, updateHandler, ariaAttrs });
}