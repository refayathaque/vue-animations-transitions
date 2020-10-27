import { createApp } from 'vue';

import App from './App.vue';
import BaseModal from './components/BaseModal.vue';
import JSTransitions from './components/JSTransitions.vue';
import AnimatedList from './components/AnimatedList.vue';

const app = createApp(App);

app.component('base-modal', BaseModal);
app.component('js-transitions', JSTransitions);
app.component('animated-list', AnimatedList);

app.mount('#app');
