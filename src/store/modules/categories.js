import api from '../api';

export default {
  namespaced: true,
  state: {
    list: [], // Cours listés par l'utilisateur
  },
  mutations: {
    LIST: (state, datas) => {
      state.list = datas;
    },
  },
  getters: {

    /*
    * LISTING: SEARCH ENGINE & PREVIEW
    */
    list(state) {
      return state.list;
    },

  },
  actions: {

    getList(context) {
      return new Promise((resolve, reject) => {
        api.get('/categories')
          .then((response) => {
            context.commit('LIST', response.data);
            resolve(response);
          })
          .catch((err) => {
            context.commit('ui/ERROR_SETTING', { message: err.message }, { root: true });
            reject(err);
          });
      });
    },
  },
};
