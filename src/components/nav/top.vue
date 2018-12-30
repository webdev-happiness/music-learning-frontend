<template>
  <v-toolbar-items>
    <v-btn flat :to="{name: 'PreviewDefault'}">Accueil</v-btn>
    <v-btn flat :to="{name: 'About'}">A propos</v-btn>
    <v-menu left v-if="isAuthenticated" class="transparent">
      <v-btn ripple slot="activator" class="transparent" >
        {{userInfos.username}}
        <v-icon right>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile :to='{name:"MyAccount"}'>
          <v-list-tile-title>Mon compte</v-list-tile-title>
        </v-list-tile>
        <v-list-tile >
          <v-list-tile-title @click.prevent="logout">Se déconnecter</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn flat :to="{name:'Logination'}" v-else>connection</v-btn>
  </v-toolbar-items>
</template>

<script>
import store from '@/store/store.js';
import { mapGetters } from 'vuex';
export default {
  name: "TopNav",
  store: store,
  data(){
    return {

    }
  },
  computed:{
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      userInfos: 'auth/getInfos'
    })
  },
  methods:{
    logout: function () {
      this.$store.dispatch("auth/logout")
      .then(() => {
        this.$router.push('/auth/login')
      })
    }
  }
}
</script>

<style lang="css">
</style>
