<template>
  <div class="preview" v-if="current">
    <v-img
          :src="current.thumbnail"
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
    <h2 class="preview-title">
      <router-link :to=" { name: 'LandingPage', params: {slug: current.slug} }">
          {{current.title}}
      </router-link>
    </h2>
    <p>temps: 1h50 </p>
    <p>auteur: admin </p>
    <p>chapitres: {{current.lessons.length}}</p>
    <p class="preview-description">{{current.description}}</p>
    <p class="preview-average">
      <v-icon
        color="grey lighten-1"
      >star</v-icon>
      <v-icon
        color="grey lighten-1"
      >star</v-icon>
      <v-icon
        color="grey lighten-1"
      >star</v-icon>
      <v-icon
        color="grey lighten-1"
      >star</v-icon>
    </p>
    <p class="preview-community">1500 inscrits !</p>
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
