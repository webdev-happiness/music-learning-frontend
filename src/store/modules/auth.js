import api from '../api.js'

export default {
  namespaced: true,
  state: {
    status: '',
    token: localStorage.getItem('user-token') || '',
    infos: {}
  },
  mutations:{
    AUTH_SUCCESS: (state, token) =>{
      state.status = "success";
      state.token = token;
    },

    AUTH_ERROR: (state) => {
      state.status = 'error';
    },

    AUTH_LOGOUT: (state) =>{
      state.status = '';
      state.token = '';
      state.infos= {}
    },

    LOAD_INFO: (state, infos) =>{
      state.infos = infos
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getInfos: state => state.infos
  },
  actions:{
    authentification: (context, user) => {
      return new Promise((resolve, reject) => {
        api.post('/auth/local', user )
          .then((response) => {
            console.log('SUCCESS USER/AUTHENTIFICATION', response)
            context.commit('AUTH_SUCCESS', response.data.jwt);
            context.commit('LOAD_INFO', response.data.user);
            localStorage.setItem('user-token', response.data.jwt)
            api.defaults.headers.common['Authorization'] = response.data.jwt;
            resolve(response.data);
          })
          .catch((err) =>{
            console.log('ERROR USER/AUTHENTIFICATION', err)
            context.commit('AUTH_ERROR');
            localStorage.removeItem('user-token')
            reject(err);
          })
      })
    },

    loadUser: (context) =>{
      context.commit('app/LOADING', true, { root: true });
      api.get('user', {headers:{
        Authorization: localStorage.getItem('user-token')
      } }).then(response => {

        console.log('SUCCESS USER/LOADUSER')
        context.commit('AUTH_SUCCESS',  localStorage.getItem('user-token'));
        context.commit('LOAD_INFO', response.data);
        context.commit('app/LOADING', false, { root: true });

      })
      .catch(err =>{

        console.log('ERROR USER/LOADUSER', err);
        context.commit('app/LOADING', false, { root: true });
        context.dispatch('logout');
        
      })
    },

    logout: (context) =>{
      return new Promise((resolve, reject) => {
        context.commit('AUTH_LOGOUT')

        localStorage.removeItem('user-token') // clear your user's token from localstorage
        delete api.defaults.headers.common['Authorization']
        resolve()
      })
    }

  }
}
