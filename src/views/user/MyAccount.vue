<template lang="html">
  <v-container  class="myAccount">
    <header class="account-header">
      <h1 class="display-3">Mon compte</h1>
      <hr>
      <v-layout style="margin-top:25px;">
        <v-avatar size="80px">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
        <div class="account-header_content">
          <h2 class="display-1">{{user.username}}</h2>
          <p>{{user.email}}</p>
        </div>
      </v-layout>
    </header>
    <section>
      <v-tabs fixed-tabs color="transparent">
        <v-tab>
          Contenu créé
        </v-tab>
        <v-tab>
          Mes informations
        </v-tab>
        <v-tab-item>
          <v-layout row wrap align-center>
            <v-flex md3>
              <v-card>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  aspect-ratio="2.75"
                ></v-img>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn flat color="orange">Voir</v-btn>
                  <v-btn flat color="orange">Modifier</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex md3 style="text-align: center;">
              <v-btn fab dark color="grey">
                <v-icon dark>add</v-icon>
              </v-btn>
              <p class="title">
                Ajouter une nouvelle formation
              </p>
            </v-flex>
          </v-layout>
        </v-tab-item>
        <v-tab-item>
          {{user}}
        </v-tab-item>
      </v-tabs>
    </section>
  </v-container>
</template>

<script>
import store from '@/store/store';

export default {
  name: 'MyAccount',
  store,
  computed: {
    user() {
      return this.$store.getters['auth/getInfos'];
    }
  }
}
</script>

<style lang="scss" scoped>
.v-avatar {
  margin-right: 25px;
}
.v-card {
  margin-top: 25px;
}
</style>
