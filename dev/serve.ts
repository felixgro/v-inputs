import { createApp } from 'vue';
import Demo from './Demo.vue';

// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import VForms from '@/entry.esm';

const app = createApp(Demo);

app.use(VForms);

app.mount('#app');
