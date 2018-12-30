<template>
  <div class="presentation" v-if="current" >
    <header class="hero" :style="'background-image: url('+ current.thumbnail +');'">
      <h1>{{current.title}}</h1>
      <p>{{current.description}}</p>
      <p class="text-xs-left"><v-btn round dark :to="{name:'Lesson', params: {formation: current.slug, lessonId: 0}}">Démarrer la formation</v-btn></p>
    </header>
    <section>
      <v-layout row wrap>
        <v-flex md8 class="presentation">
          <v-tabs dark>
            <v-tab ripple>
              Résumé
            </v-tab>
            <v-tab ripple>
              Avis
            </v-tab>
            <v-tab ripple>
              Communauté
            </v-tab>
            <v-tab-item> <!-- Resume -->
              <v-container v-html="current.content">
              </v-container>
            </v-tab-item>
            <v-tab-item> <!-- AVIS-->
              <v-container>
                <v-list v-if="current.reviews" three-line class="transparent">
                  <template v-for="r in current.reviews" >
                    <v-list-tile>
                      <v-list-tile-avatar>
                        <img :src="r.author.avatar" :alt="r.author.username"/>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="r.author.username"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="r.content"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider ></v-divider>
                  </template>
                </v-list>
                <p v-else>Pas d'avis pour le moment...</p>
              </v-container>
            </v-tab-item>
            <v-tab-item> <!-- Resume -->
              <v-container v-html="current.content">
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-flex>
        <v-flex md4 class="summary">
          <h2>Contenu</h2>
          <v-list v-if="current.lessons[0]" two-line dark>
            <div v-for="(l,i) in current.lessons" :key="i">
              <v-list-tile ripple :to="{name:'Lesson', params: {formation: current.slug, lesson: i}}">
                <v-list-tile-content>
                  <v-list-tile-title>{{l.title}}</v-list-tile-title>
                  <v-list-tile-sub-title>lorem ipsum dolor sit amet</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                <v-list-tile-action-text>20:00 min</v-list-tile-action-text>
              </v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
            </div>
          </v-list>
          <p v-else>Pas de contenu pour le moment...</p>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>
import store from '@/store/store.js';
import { mapGetters } from 'vuex';
export default {
  name: 'LandingPage',
  store,
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  computed: {
    current() {
      return this.$store.getters['courses/findBySlug'](this.$route.params.slug);
    },
  },
};
</script>

<style>
  .hero{
    background-image: url(http://via.placeholder.com/2000x1200);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding:25vh 10% 25vh 10%;
    color: white;
  }

  .summary{
    background-color: #424242;
    min-height: 500px;
    padding: 30px;
    color: white;
  }
  @media (min-width:1025px) {
    .summary{
      margin-top: -300px;
      min-height: 100vh;
    }
    .hero{
      padding:25vh 33.33333333333333% 25vh 10%;
    }
  }

  .btn{
    margin:0px;
  }

</style>
