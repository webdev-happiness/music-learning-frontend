<template>
  <div class="hello">
    <v-container fluid tag="header" class="text-xs-center hello-header">
      <v-layout align-center justify-center row fill-height class="hero">
        <v-flex xs12>
          <h1 class="display-4 font-weight-bold text-uppercase">Nos cours de musique</h1>
          <p class="subheading">L' apprentissage de la musique en mode Open source !</p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container  fluid>
      <v-layout row wrap class="courses-list" v-if="!loading">
        <v-flex sm3 v-for="(c, index) in courses">
          <v-card>
            <v-img
                  :src="'http://strapi.websylvain.com' + c.thumbnail.url"
                  max-height="300"
                  aspect-ratio="1"
                  class="grey lighten-2 thumbnail"
                >
                <v-container
                  fill-height
                  fluid
                  pa-2
                >
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <v-rating :value="4" readonly></v-rating>
                    </v-flex>
                  </v-layout>
                </v-container>
            </v-img>
            <v-card-title primary-title>
              <h2>
                <router-link :to=" { name: 'LandingPage', params: {slug: c.slug} }">
                  {{c.title}}
                </router-link>
              </h2>
            </v-card-title>
            <v-card-actions>
              <v-list-tile class="grow">
                <v-list-tile-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{c.user.username}}</v-list-tile-title>
                </v-list-tile-content>

                <v-layout
                  align-center
                  justify-end
                >
                  <v-icon class="mr-1">av_timer</v-icon>
                  <span class="subheading mr-2">1h00</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1">playlist_play</v-icon>
                  <span class="subheading">{{c.lessons.length}}</span>
                </v-layout>
              </v-list-tile>
            </v-card-actions>
            <v-card-text>
              <p class="preview-description">{{c.description}}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else>
        <v-flex sm12>
          <loader/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import loader from '@/components/loading/loader.vue';
import store from '@/store/store';
import { mapGetters } from 'vuex';

export default {
  name: 'HelloWorld',
  store,
  components: {loader},
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      sortByValue: 'alpha',
    };
  },
  computed: {
    ...mapGetters({
      courses: 'courses/list',
      loading: 'ui/loading'
    }),
  },
};
</script>

<style media="screen" lang="scss">
  .courses-list{
    padding-left: 16px;
    min-height: 50vh;
    position: relative;
  }

  .hello-header{
    height: 50vh;
    width:100%;
    background-image: url(http://via.placeholder.com/2000x1200);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    .hero{
      
    }
  }

</style>
