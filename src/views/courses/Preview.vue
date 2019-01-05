<template>
  <div class="preview" v-if="current">
    <v-card>
      <v-img
            :src="'http://strapi.websylvain.com' + current.thumbnail.url"
            max-height="300"
            aspect-ratio="1"
            class="grey lighten-2 thumbnail"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular indeterminate></v-progress-circular>
            </v-layout>
      </v-img>
      <v-card-title primary-title>
        <h2>
          <router-link :to=" { name: 'LandingPage', params: {slug: current.slug} }">
            {{current.title}}
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
            <v-list-tile-title>{{current.user.username}}, Il y a 5 jours</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-card-actions>
      <v-card-text>
        <p>temps: 1h50 </p>
        <p>auteur: {{current.user.username}} </p>
        <p>chapitres: {{current.lessons.length}}</p>
        <p class="preview-description">{{current.description}}</p>

      </v-card-text>

    </v-card>
  </div>
</template>

<script>
import store from '@/store/store';
import { mapGetters } from 'vuex';

export default {
  name: 'Presentation',
  store,
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  computed: {
    ...mapGetters({
      findBySlug: 'courses/findBySlug',
      getFirst: 'courses/getFirst',
    }),
    current() {
      if (this.$route.params.slug) {
        return this.findBySlug(this.$route.params.slug);
      }
      return this.getFirst;
    },
  },
};
</script>

<style lang="scss" scoped>

  .hero{
    background-image: url(http://via.placeholder.com/2000x1200);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding:10vh 10% 10vh 10%;
    color: white;
  }

  .btn{
    margin:0px;
  }

  .preview{
    .thumbnail{
      margin-bottom: 20px;
    }
    .preview-title{
      text-transform: uppercase;
      margin-bottom: 16px;
    }
  }
</style>
