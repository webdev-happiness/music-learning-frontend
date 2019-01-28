import api from '../api';

export default {
  namespaced: true,
  state: {
    list: [], // Cours listés par l'utilisateur
    current: null,
    visited: null,
  },
  mutations: {
    LIST: (state, datas) => {
      state.list = datas;
    },
    CURRENT: (state, lesson) => {
      state.current = lesson;
    },
  },
  getters: {

    /*
    * LISTING: SEARCH ENGINE & PREVIEW
    */
    list(state) {
      return state.list;
    },

    // FIND COURSE LANDING INFO
    findBySlug(state) {
      return (slug) => {
        return state.list.find(e => e.slug === slug);
      };
    },

    getFirst(state) {
      return state.list[0];
    },

    /*
    * VISITED: HISTORIQUE DES COURS
    */
    findInVisited(state) {
      return (slug) => {
        return state.visited.find(e => e.slug === slug);
      };
    },

    currentLesson(state) {
      // RETURN CURRENT COURS  E
      return state.current;
    },

  },
  actions: {
    // Get FULL INFO OF A COURSE
    getCurrent: (context, payload) => {
      // Search in cached array (if already visited) else api search.
      context.commit('ui/LOADING', true, { root: true });
      return new Promise((resolve, reject) => {
        api.get('/lessons/' + payload)
          .then((response) => {
            context.commit('CURRENT', response.data);
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    /*
    * Liste un certain nombre de cours (uniquement pour la présentation)
    */
    getList(context) {
      return new Promise((resolve, reject) => {
        api.get('/courses')
          .then((response) => {
            context.commit('LIST', response.data);
            resolve(response);
          })
          .catch((err) => {
            context.commit('ui/ERROR_SETTING', { message: 'Network fail !' }, { root: true });
            reject(err);
          });
      });
    },
  },
};
