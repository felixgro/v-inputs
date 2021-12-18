import { ref, readonly, onBeforeMount } from 'vue';

let UUID = 0;

export default function useUID() {
    onBeforeMount(() => UUID++);
    const uid = ref(`UID_${UUID}`);
    return readonly(uid);
}