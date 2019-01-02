import Vue from 'vue';
import api from '../api';
import faker from 'faker';

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
    list: (state) => {
      return state.list;
    },

    // FIND COURSE LANDING INFO
    findBySlug: (state) => {
      return (slug) => {
        return state.list.find(e => e.slug === slug);
      };
    },

    getFirst: (state) => {
      return state.list[0];
    },

    /*
    * VISITED: HISTORIQUE DES COURS
    */
    findInVisited: (state) => {
      return (slug) => {
        return state.visited.find(e => e.slug === slug);
      };
    },

    current: (state) => {
      // RETURN CURRENT COURS  E
      return {"title":"Nisi suscipit incidunt accusantium ut.","thumbnail":"https://picsum.photos/2000/600?image=44","slug":"um-sunt-aut-molestiae-a-veritatis","description":"Et dolorem qui labore rerum excepturi quo facilis cum voluptas. Nobis maxime voluptate dignissimos. Qui dignissimos aut doloremque eveniet sunt maxime cupiditate. Quam aut quis suscipit est ea omnis. Aliquam eveniet veniam sint.","content":"Sequi occaecati magni pariatur qui molestiae tenetur reiciendis. Natus deserunt ab laboriosam minus sit quas alias voluptatem quam. Praesentium necessitatibus quae quia. At nulla doloremque repellat veniam non libero voluptatum culpa qui. Ad nihil ut nihil nam repellat quia est praesentium. Suscipit neque eius sunt autem.Dolor aut id enim aut similique dolores tempora vero. Est atque at enim eveniet sit voluptatum et et at. Quidem facilis dolorum velit dolor aspernatur odio dolores.Eius quasi nostrum. Facilis velit animi ea nisi voluptatibus atque omnis.","lessons":[{"title":"Ut possimus sit et eos quam qui natus voluptates omnis.","description":"Culpa non quisquam eius accusantium minus soluta eligendi asperiores ducimus. Dicta commodi magni excepturi vero explicabo assumenda eos. Quis qui perspiciatis nemo totam error nostrum repellendus."},{"title":"Debitis sint velit velit nobis accusamus dolorum.","description":"Et aut quis dolorum. Totam officia facere voluptas. Consectetur eius sint aut esse vitae iusto sapiente fugit. Quas esse dolorum libero sit recusandae enim doloremque adipisci repellendus."},{"title":"Harum porro officia voluptas corrupti soluta ipsam est porro minus.","description":"Aut aperiam incidunt quo at. Voluptatum quis sunt natus quis adipisci voluptatem impedit et sed. Quo qui voluptas in explicabo omnis omnis rerum. Occaecati et harum eius laudantium repellendus molestiae sunt explicabo itaque. Veniam sint suscipit officiis porro et."},{"title":"Eum unde facere eos deserunt quia excepturi.","description":"Rerum nostrum iste impedit cum quis quia officiis minima a. Tempore voluptatum omnis omnis ratione fugiat qui vero. Vitae autem recusandae ea unde nemo magnam distinctio reiciendis. Incidunt dolorem laboriosam porro qui ipsa impedit."}],"reviews":[{"author":{"username":"Nathen_Bergnaum","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/nwdsha/128.jpg"},"content":"Numquam nihil quaerat repudiandae ut tempore illo est voluptates. Reiciendis sequi aut ab reprehenderit dolore quam et consequatur. Ratione culpa est et ducimus. Provident voluptates provident ea sint qui et earum maiores. Aut harum maiores aut qui."},{"author":{"username":"Evangeline53","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/ffbel/128.jpg"},"content":"Corrupti asperiores qui ut deleniti deserunt est laboriosam. Non rerum eligendi neque sunt ratione enim."},{"author":{"username":"Katheryn_Witting","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/michaelabehsera/128.jpg"},"content":"Cum dolores earum laboriosam fugiat et veniam dolor. Hic et nihil tenetur et dolore nulla porro. Dignissimos quibusdam nisi quaerat magni."},{"author":{"username":"Donny_White","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/xiel/128.jpg"},"content":"Itaque odit odit impedit. Et sed illo nihil voluptas quidem exercitationem velit hic. Distinctio veritatis et voluptatem explicabo rerum impedit qui. Possimus aut sint quia corrupti sint quos veritatis."}]}
    },

  },
  actions: {
    // Get FULL INFO OF A COURSE
    getCurrent: (context, payload) => {
      // Search in cached array (if already visited) else api search.
      context.commit('ui/LOADING', true, { root: true });
      return new Promise((resolve, reject) => {
        // QUERY FOR GET THE CURRENT COURSE
        setTimeout(() => {
          context.commit('ui/LOADING', false, { root: true });
          resolve(true);
        }, 2000);
      });
    },

    /*
    * Liste un certain nombre de cours (uniquement pour la présentation)
    */
    getList(context, payload) {
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
