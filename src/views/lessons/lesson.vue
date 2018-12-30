<template>
  <div class="lesson" v-if="course">
    <header
      class="lesson_header"
      :style="`background-image: url('` + 'https://picsum.photos/2000/600?random' +`');`">
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
          <v-flex md12>
            <div>
              <p>
                <router-link :to="{name:'LandingPage', params: {slug:course.slug}}">
                  {{course.title}}
                </router-link>
              </p>
              <h1 class="text-reveal" :class="{'loaded': !loading}"><span>{{lesson.title}}</span></h1>
              <p><small>Posté le 12/12/18 par Sylvain Pastor</small></p>
            </div>
            <media file="https://www.youtube.com/watch?v=Za1DKikt6x0"></media>
          </v-flex>
        </v-layout>
      </v-container>
    </header>
    <v-layout row child-flex wrap>
        <div>
          <v-toolbar flat>
            <v-menu :nudge-width="100">
                <v-toolbar-title slot="activator">
                  <span>
                    {{lessonId + 1}} / {{course.lessons.length}} leçons
                  </span>
                  <v-icon>arrow_drop_down</v-icon>
                </v-toolbar-title>
                <v-list>
                  <v-list-tile v-for="(l,i) in course.lessons" :key="i"
                    :to="{name:'Lesson', params:{formation: course.slug, lesson: i }}">
                    <v-list-tile-title>{{l.title}}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <v-spacer></v-spacer>
          </v-toolbar>
        </div>

        <div>
          <v-toolbar flat hidden-xs-only>
            <v-spacer></v-spacer>
            <router-link class="text-reveal" :class="{'loaded' : !loading}" v-if="course.lessons[lessonId - 1]" :to="{name:'Lesson', params:{formation: course.slug, lesson: lessonId - 1 }}">
              <span>{{course.lessons[lessonId - 1].title}}</span>
            </router-link>
            <router-link class="text-reveal" :class="{'loaded' : !loading}"  v-if="course.lessons[lessonId + 1]" :to="{name:'Lesson', params:{formation: course.slug, lesson: lessonId + 1 }}">
              <span>{{course.lessons[lessonId + 1].title}}</span>
            </router-link>
          </v-toolbar>
        </div>
      </v-layout>
    <v-container>
      <v-layout
        row wrap
        >
        <v-flex sm8 style="min-height:50vh;position:relative;">
          <v-container style="padding-top:0px; " v-if="!loading">
            <v-tabs fixed-tabs color="transparent">
              <v-tab>
                Contenu
              </v-tab>
              <v-tab>
                Pièces jointes
              </v-tab>
              <v-tab>
                Communauté
              </v-tab>
              <v-tab-item>
                <div class="module" v-html="lesson.description">
                </div>
              </v-tab-item>
              <v-tab-item>
                <div class="module">
                  <h3>Partitions / Tablatures</h3>
                  <v-list color="transparent">

                    <v-list-tile>
                      <v-list-tile-avatar>
                        <v-icon>file_copy</v-icon>
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title>jaco-pastorius-chicken-partition.pdf</v-list-tile-title>
                        <v-list-tile-sub-title>50 mb</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-btn icon ripple>
                          <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-avatar>
                        <v-icon>file_copy</v-icon>
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title>jaco-pastorius-chicken-partition.pdf</v-list-tile-title>
                        <v-list-tile-sub-title>50 mb</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-btn icon ripple>
                          <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </div>
                <div class="module">
                  <h3>Fichiers audios</h3>
                  <v-list color="transparent">
                    <v-list-tile>
                      <v-list-tile-avatar>
                        <v-icon>music_off</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>jaco-pastorius-chicken-backing-track.mp3</v-list-tile-title>
                        <v-list-tile-sub-title>50 mb</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-btn icon ripple>
                          <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-avatar>
                        <v-icon>music_note</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>jaco-pastorius-chicken.mp3</v-list-tile-title>
                        <v-list-tile-sub-title>50 mb</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-btn icon ripple>
                          <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </div>
              </v-tab-item>
              <v-tab-item>
                <comments :lessonId="lesson.id"/>
              </v-tab-item>
            </v-tabs>
          </v-container>
          <v-container v-else>
            <loader />
          </v-container>
        </v-flex>
        <v-flex sm4 class="sidebar">
          <div class="module">
            <h3>Auteur</h3>
            <v-layout row wrap align-center>
              <v-flex xs3>
                <v-badge overlap  color="green" style="margin-top:10px;">
                  <span slot="badge">3</span>
                  <v-avatar>
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-avatar>
                </v-badge>
              </v-flex>
              <v-flex xs9>
                <h4>PASTOR Sylvain</h4>
                <small>Posté le ....</small>
              </v-flex>
            </v-layout>
          </div>
          <div class="module">
            <h3>Catégories</h3>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Fusion</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Groove</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Cover</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </div>
          <div class="module">
            <h3>Tags</h3>
            <v-chip>Jaco</v-chip>
            <v-chip>Pastorius</v-chip>
            <v-chip>Grouve</v-chip>
            <v-chip>Chicken</v-chip>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import store from '@/store/store';
import loader from '@/components/loading/loader.vue';
import media from '@/components/Media.vue';
import comments from '@/components/comments/comments.vue';

export default {
  name: 'Lesson',
  store,
  components: { loader, media, comments },
  data() {
    return {
      active: 1,
      lessonId: 0,
    };
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch('courses/getCurrent', this.lessonId).then(() => {
        this.lessonId = parseInt(to.params.lesson);
      });
    },
  },
  mounted() {
    this.lessonId = parseInt(this.$route.params.lesson);
    this.$store.dispatch('courses/getCurrent', this.lessonId);
  },
  methods: {

  },
  computed: {
    loading() {
      return this.$store.getters['ui/loading'];
    },
    course() {
      return this.$store.getters['courses/current'];
    },
    lesson() {
      return this.course.lessons[this.lessonId];
    },
  },
};
</script>

<style lang="scss">
  .lesson {
    .lesson_header {
      padding: 50px;
      position:relative;
      color: white;
      background-size: cover;
      background-repeat: no-repeat;
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        background: rgba(64,72,82,.8);
        -webkit-transition-duration: .3s;
        transition-duration: .3s;
      }
      .container {
        z-index: 100;
        position: relative;
      }
      
      .btn-next-prev {

      }
      .text-reveal{
        position:relative;
        text-align: center;
        margin-bottom: 50px;
        h1 {
          font-size: 42px;
        }
      }
    }
    .v-window-item {
      padding-top: 20px;
    }
    .module {
      margin: 0px 0px 20px 0px;
      h3 {
        margin-bottom: 20px;
      }
    }
  }
</style>
