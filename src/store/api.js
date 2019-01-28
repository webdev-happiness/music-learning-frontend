import axios from 'axios';
import app from '../main';
import store from './store';

const api = axios.create({
  baseURL: 'http://strapi.websylvain.com',
});

api.interceptors.request.use((config) => {
  app.$Progress.start(); // for every request start the progress
  store.dispatch('ui/loading', true);
  return config;
});

api.interceptors.response.use((response) => {
  app.$Progress.finish();
  setTimeout(() => {
    store.dispatch('ui/loading', false);
  }, 500);
  return response;
});

export default api;
