<template>
    <v-form v-model="valid" lazy-validation  @submit.prevent="authentification" class="login-form">
      <h1 class="text-xs-center">Se connecter</h1>
      <p v-if="error" class="red--text">{{error.message}}</p>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
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
      <v-checkbox
        v-model="checkbox"
        label="Rester connecté"
        required
      ></v-checkbox>
      <v-btn large style="width:100%;"
        color="info"
        type="submit"
        :disabled="!valid"
          @click="authentification"
        >
        Se connecter
      </v-btn>
      <hr>
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
      checkbox: false,
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

<style lang="scss" scoped>
.login-form {
  background-color: #f5f5f5;
  padding: 20px;
  .v-btn {
    margin: 0px;
    margin-bottom: 20px;
  }
}
</style>
