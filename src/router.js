import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import About from '@/views/About.vue';
import LandingPage from '@/views/courses/LandingPage.vue';
import Lesson from '@/views/lessons/lesson.vue';
import MyAccount from '@/views/user/MyAccount.vue';
import page404 from '@/views/404.vue';

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
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/formation/:slug',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/go/:formation/:lesson',
      name: 'Lesson',
      component: Lesson,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/user',
      name: 'MyAccount',
      component: MyAccount,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/404',
      name: '404',
      component: page404,
    },
  ],
});
