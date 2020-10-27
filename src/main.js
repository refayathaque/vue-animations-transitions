import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue';
import BaseModal from './components/BaseModal.vue';
import JSTransitions from './components/JSTransitions.vue';
import AnimatedList from './components/AnimatedList.vue';
import AllUsers from './pages/AllUsers.vue';
import CourseGoals from './pages/CourseGoals.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: AllUsers },
    { path: "/goals", component: CourseGoals },
  ],
})

const app = createApp(App);

app.component('base-modal', BaseModal);
app.component('js-transitions', JSTransitions);
app.component('animated-list', AnimatedList);

app.use(router);

router.isReady().then(function() {
  app.mount('#app');
})
// ^ makes sure that the app is only mounted (rendered) once the router is fully set up and aware of the page that should be loaded