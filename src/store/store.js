import Vue from 'vue';
import Vuex from 'vuex';
import courses from './modules/courses';
import comments from './modules/comments';
import ui from './modules/ui';
import auth from './modules/auth';

Vue.use(Vuex);
export default new Vuex.Store({
  namespaced: true,
  modules: {
    courses,
    ui,
    comments,
    auth,
  },
});
