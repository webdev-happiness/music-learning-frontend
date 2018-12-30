<template>
  <v-list dense class="LeftNav">
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon>contact_mail</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Contact</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import store from '@/store/store.js';
import { mapGetters } from 'vuex';
export default {
  name: "LeftNav",
  store: store,
  data(){
    return {

    }
  },
  computed:{
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated'
    })
  }
}
</script>

<style lang="css">
</style>
