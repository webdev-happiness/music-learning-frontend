<template>
  <v-form class="login"  v-model="valid" lazy-validation>
  <v-container>
      <h1>Sign in</h1>
      <p v-if="error" class="red--text">{{error.message}}</p>
      <form @submit.prevent="authentification">
        <v-layout row wrap>
          <v-flex xs12 sm6 pr-5>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              v-model="password"
              @click:append="showPassword ? 'visibility_off' : 'visibility'"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              hint="At least 5 characters"
              counter
              @click:append-cb="prependIconCall"
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-btn
            type="submit"
            :disabled="!valid"
              @click="authentification"
            >
              Se connecter
            </v-btn>
          </v-flex>
        </v-layout>
      </form>
  </v-container>
  </v-form>
</template>

<script>
import store from '@/store/store.js';
import { mapGetters } from 'vuex';
export default {
  name: 'Logination',
  store: store,
  data () {
    return {
      valid: false,
      email: "",
      password: "",
      error: null,
      showPassword: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 5 || 'Min 5 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },
  methods: {
    prependIconCall(){
      this.showPassword = !this.showPassword;
    },
    authentification() {
      let user = {
        identifier: this.email,
        password: this.password
      }
      this.$store.dispatch('auth/authentification', user).then(
        (response)=>{
          console.log(response)
          this.$router.push('/user')
        },
        (err)=>{
          console.log(err)
          this.error =  err;
        }
      )
    }
  }
}
</script>

<style lang="css">
</style>
