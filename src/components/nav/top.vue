<template>
  <v-toolbar-items>
    <v-btn flat :to="{name: 'PreviewDefault'}">Accueil</v-btn>
    <v-btn flat :to="{name: 'About'}">A propos</v-btn>
    <v-menu left v-if="isAuthenticated" class="transparent">
      <v-btn flat slot="activator" class="transparent" >
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
    <v-btn flat @click.prevent="dialog = true" v-else>connection</v-btn>
    <v-dialog v-if="userInfos.username == undefined" v-model="dialog"
      max-width="500">
      <loginForm />
    </v-dialog>
  </v-toolbar-items>
</template>

<script>
import store from '@/store/store.js';
import { mapGetters } from 'vuex';
import loginForm from '@/views/user/Logination.vue';
export default {
  name: "TopNav",
  store: store,
  components: {loginForm},
  data(){
    return {
      dialog : false
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
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="css">
</style>
