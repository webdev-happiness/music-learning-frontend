import Vue from 'vue';
import faker from 'faker';
import api from '../api';

export default {
  namespaced: true,
  state: {
    comments: [],
    reply_id: 0,
  },
  mutations: {
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    ADD_COMMENT(state, comment) {
      console.log('COMMENTé !', comment);
    },
    REPLY_TO(state, id) {
      state.reply_id = id;
    }
  },
  getters: {
    getAll(state) {
      return state.comments;
    },
  },
  actions: {
    comment(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
          context.commit('ADD_COMMENT', payload);
        }, 4000);
      });
    },
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
