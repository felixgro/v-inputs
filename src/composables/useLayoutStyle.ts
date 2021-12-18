import { computed, readonly } from 'vue';

export default function useLayoutStyle<T extends { inline?: boolean; }>(props?: T) {
    const style = computed(() => ({
        display: props?.inline ? 'inline-block' : 'block'
    }))

    return readonly(style);
}