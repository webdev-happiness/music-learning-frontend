<template>
    <v-layout class="comment-form" align-baseline>
      <v-avatar size="36px">
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
      </v-avatar>
      <form @submit.prevent="comment" class="comment-form_form">
        <v-textarea
          :loading="loading"
          placeholder="Votre commentaire ici..."
          height="1"
          no-resize
          full-width
          v-model="content"
          hint="Hint text"/>
         <v-btn flat right color="info" @click="comment">Commenter</v-btn>
      </form>
    </v-layout>
</template>

<script>
import store from '@/store/store';
import { mapGetters } from 'vuex';

export default {
  store,
  data() {
    return {
      content: '',
      loading: false,
    }
  },
  methods: {
    comment() {
      this.loading = true;
      this.$store.dispatch('comments/comment', {content: this.content, author: this.user._id} )
        .then(() => {
          this.loading = false;
          this.content = "";
        });
    }
  },
  computed: {
    ...mapGetters({
      user:'auth/getInfos'
    })
  }
}
</script>

<style lang="scss" scoped>
.comment-form{
  margin: 15px 0px 25px 0px;
  .comment-form_form{
    padding-left: 15px;
    width: 100%;
    .v-input{
      padding: 0px;
    }
  }
}
</style>
