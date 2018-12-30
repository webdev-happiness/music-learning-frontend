import api from '../api';

export default {
  namespaced: true,
  state: {
    status: '',
    token: localStorage.getItem('user-token') || '',
    infos: {},
  },
  mutations: {
    AUTH_SUCCESS(state, token) {
      state.status = 'success';
      state.token = token;
    },
    AUTH_ERROR(state) {
      state.status = 'error';
    },
    AUTH_LOGOUT(state) {
      state.status = '';
      state.token = '';
      state.infos = {};
    },
    LOAD_INFO(state, infos) {
      state.infos = infos;
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getInfos: state => state.infos,
  },
  actions: {
    authentification(context, user) {
      return new Promise((resolve, reject) => {
        api.post('/auth/local', user)
          .then((response) => {
            context.commit('AUTH_SUCCESS', response.data.jwt);
            context.commit('LOAD_INFO', response.data.user);
            localStorage.setItem('user-token', response.data.jwt);
            api.defaults.headers.common.Authorization = `Bearer ${response.data.jwt}`;
            resolve(response.data);
          })
          .catch((err) => {
            context.commit('AUTH_ERROR');
            localStorage.removeItem('user-token');
            reject(err);
          });
      });
    },
    checkToken(context) {
      api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
      }).then((response) => {
        context.commit('AUTH_SUCCESS', localStorage.getItem('user-token'));
        context.commit('LOAD_INFO', response.data);
      }).catch(() => {
        context.dispatch('logout');
      });
    },
    logout(context) {
      context.commit('AUTH_LOGOUT');
      localStorage.removeItem('user-token'); // clear your user's token from localstorage
      delete api.defaults.headers.common.Authorization;
    },
  },
};
