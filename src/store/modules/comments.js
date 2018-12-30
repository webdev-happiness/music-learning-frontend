import Vue from 'vue';
import faker from 'faker';
import api from '../api';

export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
  },
  getters: {
    getAll(state) {
      return state.comments;
    },
  },
  actions: {
    loadAll(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let comments = [];
          for (let index = 0; index < 20; index++) {
            comments.push({
              author: {
                username: faker.internet.userName(),
                avatar: faker.internet.avatar(),
              },
              content: faker.lorem.sentences(),
              replies: [{
                author: {
                  username: faker.internet.userName(),
                  avatar: faker.internet.avatar(),
                },
                content: faker.lorem.sentences(),
                author: {
                  username: faker.internet.userName(),
                  avatar: faker.internet.avatar(),
                },
                content: faker.lorem.sentences(),
              }],
            });
          }
          context.commit('SET_COMMENTS', comments);
          resolve(comments);
        }, 3000);
      });
    },
  },
};
