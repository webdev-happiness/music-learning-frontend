import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import Preview from '@/views/courses/Preview.vue';
import About from '@/views/About.vue';
import LandingPage from '@/views/courses/LandingPage.vue';
import Lesson from '@/views/lessons/lesson.vue';
import Logination from '@/views/user/Logination.vue';
import MyAccount from '@/views/user/MyAccount.vue';

import store from './store/store'; // your vuex store

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next();
    return;
  }
  next('/user/login');
};


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: HelloWorld,
      children: [
        {
          path: '/:slug',
          name: "Preview",
          component: Preview
        },
        {
          path: '/',
          name: "PreviewDefault",
          component: Preview
        },
      ],
    },
    {
      path: '/formation/:slug',
      name: "LandingPage",
      component: LandingPage
    },
    {
      path: '/go/:formation/:lesson',
      name: 'Lesson',
      component: Lesson
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/user',
      name: "MyAccount",
      component: MyAccount,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/user/login',
      name: 'Logination',
      component: Logination
    },
  ],
});
