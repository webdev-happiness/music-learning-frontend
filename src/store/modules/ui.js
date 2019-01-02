export default {
  namespaced: true,
  state: {
    loading: false, // SUM DES FORMATIONS DISPONIBLES SUR LE SERVEUR
    theme: 'light',
    error: null,
  },
  mutations: {
    LOADING(state, bool) {
      state.loading = bool;
    },
    ERROR_SETTING(state, message) {
      state.error = message;
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
  actions: {
    loading(context, bool) {
      context.commit('LOADING', bool);
    },
    setError(context, payload) {
      context.commit('ERROR_SETTING', {
        message: payload,
        status: true,
      });
    },
  },
};
