import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '6px',
});

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
