<template>
  <div class="lesson" v-if="course">
    <header
      class="lesson_header"
      :style="`background-image: url('` + 'https://picsum.photos/2000/600?random' +`');`">
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap justify-center>
          <v-flex md8>
            <div>
              <p class="title">
                <router-link :to="{name:'LandingPage', params: {slug:course.slug}}">
                  {{course.title}}
                </router-link>
              </p>
              <h1 class="display-3 text-reveal" :class="{'loaded': !loading}"><span>{{lesson.title}}</span></h1>
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
            <v-menu :nudge-width="100" v-if="course">
                <v-toolbar-title slot="activator">
                  <span>
                    {{indexInCourse + 1}} / {{course.lessons.length}} leçons
                  </span>
                  <v-icon>arrow_drop_down</v-icon>
                </v-toolbar-title>
                <v-list>
                  <v-list-tile v-for="(l,i) in course.lessons" :key="i"
                    :to="{name:'Lesson', params:{formation: course.slug, lesson: l.id }}">
                    <v-list-tile-title>{{l.title}}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <v-spacer></v-spacer>
          </v-toolbar>
        </div>

        <div v-if="course">
          <v-toolbar flat hidden-xs-only>
            <v-spacer></v-spacer>
            <router-link v-if="previous" class="text-reveal prev" :class="{'loaded' : !loading}" :to="{name:'Lesson', params:{formation: course.slug, lesson: previous.id }}">
              <span><v-icon small>arrow_back</v-icon> {{previous.title}}</span>
            </router-link>
            <router-link v-if="next" class="text-reveal next" :class="{'loaded' : !loading}" :to="{name:'Lesson', params:{formation: course.slug, lesson: next.id }}">
              <span>{{next.title}} <v-icon small>arrow_forward</v-icon></span>
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
                <vue-markdown>
                  {{lesson.content}}
                </vue-markdown>
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
            <h3 class="title">Auteur</h3>
            <v-layout row wrap align-center>
                <v-badge overlap  color="green" style="margin-top:10px;">
                  <span slot="badge">3</span>
                  <v-avatar>
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-avatar>
                </v-badge>
                <div style="margin-left:20px;">
                  <h4 >PASTOR Sylvain</h4>
                  <small>Posté le {{lesson.createdAt}}</small>
                </div>
            </v-layout>
          </div>
          <div class="module">
            <h3 class="title">Publie dans <a href="">{{course.category.label}}</a></h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, totam! 
              Delectus explicabo facere perferendis quas assumenda repudiandae quam minus 
              enim eveniet atque non molestiae laboriosam nesciunt provident unde, voluptatem consectetur.
            </p>
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
import VueMarkdown from 'vue-markdown';

export default {
  name: 'Lesson',
  store,
  components: { loader, media, comments, VueMarkdown },
  data() {
    return {
      active: 1,
      lessonId: 0,
      loading:true
    };
  },
  watch: {
    $route(to, from) {
      this.loading = true;
      this.$store.dispatch('courses/getCurrent', to.params.lesson)
        .then(
          () => {
            this.loading = false;
            this.lessonId = to.params.lesson;
          }
        )
        .catch(() => {

          this.loading = false;
          this.$router.push({to: '404'});
        });
    },
  },
  mounted() {
    this.lessonId = this.$route.params.lesson;
    this.$store.dispatch('courses/getCurrent', this.lessonId)
      .then(() => {
        this.loading = false;
      })
      .catch(() => {

        this.loading = false;
        this.$router.push({to: '404'});
      });
  },
  methods: {

  },
  computed: {
    lesson() {
      return this.$store.getters['courses/currentLesson'];
    },
    course() {
      return this.$store.getters['courses/findBySlug'](this.$route.params.formation);
    },
    indexInCourse() {
      let arr = this.course.lessons;
      return arr.findIndex(e => e.id == this.lesson.id)
    },
    next(){
      return this.course.lessons[this.indexInCourse + 1];
    },
    previous() {
      return this.course.lessons[this.indexInCourse - 1];
    }
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
      .text-reveal{
        position:relative;
        text-align: center;
        margin-bottom: 50px;
        h1 {
          font-size: 42px;
        }
      }
    }


    .prev, .next {
      margin-right: 10px;
      text-transform: uppercase;;
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
