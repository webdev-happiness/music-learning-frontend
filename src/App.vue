<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <!-- LEFT NAV -->
      <LeftNav></LeftNav>
      <!-- END LEFT NAV -->
    </v-navigation-drawer>
    <v-toolbar app dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{name: 'HelloWorld'}">
          <span>Rocking</span>
          <span class="font-weight-light">Place</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- TOP NAV -->
      <TopNav></TopNav>
      <!-- END TOP NAV -->
    </v-toolbar>
    <vue-progress-bar></vue-progress-bar>
    <v-content>
      <!-- MAIN CONTENT -->
        <router-view/>
      <!-- END MAIN CONTENT -->
    </v-content>
    <v-snackbar
    v-if="error"
     v-model="snackbar"
     :bottom="true"
     :right="true"
     :timeout="5000"
   >
     {{ error.message }}
     <v-btn
       color="pink"
       flat
       @click="snackbar = false"
     >
       Close
     </v-btn>
   </v-snackbar>
  </v-app>
</template>

<script>
import store from '@/store/store';
import LeftNav from '@/components/nav/left.vue';
import TopNav from '@/components/nav/top.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  store,
  components: {LeftNav, TopNav},
  data() {
    return {
      drawer: false,
      snackbar : false
    };
  },
  mounted() {
    this.$store.dispatch('courses/getList').then(response => {
      console.log(response);
    });
    this.$store.dispatch('categories/getList').then(response => {
      console.log(response);
    });
    if (localStorage.getItem('user-token')) {
      this.$store.dispatch('auth/checkToken');
    }
  },
  computed: {
    error() {
      this.snackbar = true;
      return this.$store.getters['ui/error'];
    }
  }
};
</script>

<style lang="scss">
  /* title styles */
  .text-reveal span{
      position: relative;
      overflow: hidden;
      display: block;
      line-height: 1.2;
  }

  .text-reveal span::after{
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: white;
  }

  .text-reveal.loaded span::after{
      animation: a-ltr-after .5s cubic-bezier(.77,0,.18,1) forwards;
      transform: translateX(-101%);
  }

  .text-reveal span::before{
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: white;
  }

  .text-reveal.loaded span::before{
      animation: a-ltr-before .5s cubic-bezier(.77,0,.18,1) forwards;
      transform: translateX(0);
  }

  .text-reveal span:nth-of-type(1)::before,
  .text-reveal span:nth-of-type(1)::after{
      animation-delay: .5s;
  }

  .text-reveal span:nth-of-type(2)::before,
  .text-reveal span:nth-of-type(2)::after{
      animation-delay: .5s;
  }

  @keyframes a-ltr-after{
      0% {transform: translateX(-100%)}
      100% {transform: translateX(101%)}
  }

  @keyframes a-ltr-before{
      0% {transform: translateX(0)}
      100% {transform: translateX(200%)}
  }
</style>
