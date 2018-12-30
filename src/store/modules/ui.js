export default {
  namespaced: true,
  state: {
    loading: false, // SUM DES FORMATIONS DISPONIBLES SUR LE SERVEUR
    theme: "light"
  },
  mutations:{
    LOADING: (state, bool) =>{
      state.loading = bool;
    }
  },
  getters: {
    loading: (state) =>{
      return state.loading;
    }
  },
  actions:{
    loading: (context, bool) => {
      context.commit('LOADING', bool);
    }
  }
}
