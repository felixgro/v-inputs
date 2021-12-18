export default function useInputListener<T extends HTMLInputElement>(updateCallback: (target: T) => void) {
    return (e: Event) => {
        const target = e.target as T;
        updateCallback(target);
    };
}