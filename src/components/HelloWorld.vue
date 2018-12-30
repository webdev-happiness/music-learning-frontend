<template>
  <div class="hello">
    <v-container  fluid v-if="courses">
      <v-layout>
        <v-flex md4>
          <router-view/>
        </v-flex>
        <v-flex md8 class="courses-list">
          <v-list two-line class="transparent pt-0" v-if="courses[0]">
            <template v-for="(item, index) in courses">
              <v-list-tile
                :key="item.title"
                avatar
                ripple
                :to="{ name: 'Preview', params: { slug: item.slug }}"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary"></v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>45:00 mn</v-list-tile-action-text>
                  <v-icon
                    color="grey lighten-1"
                  >star_border</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < courses.length" :key="index"></v-divider>
            </template>
          </v-list>
          <loader v-else/>
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
    }),
  },
};
</script>

<style media="screen">
  .courses-list{
    padding-left: 16px;
    min-height: 50vh;
    position: relative;
  }
</style>
