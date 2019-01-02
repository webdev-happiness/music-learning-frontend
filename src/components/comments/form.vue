<template>
    <v-layout class="comment-form" align-baseline>
      <v-avatar size="36px">
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
      </v-avatar>
      <v-form @submit.prevent="comment" class="comment-form_form">
        <v-layout row wrap>
          <v-flex xs12>
            <v-textarea
              style="display:block;"
              row-height="10"
              :rows="1"
              :loading="loading"
              placeholder="Votre commentaire ici..."
              @keyup.native="isTyping"
              no-resize
              full-width
              v-model="content"/>
            </v-textarea>
          </v-flex>
          <v-flex xs12 text-xs-right>
            <v-btn :disabled="!typing" :right="true" color="info" @click="comment">Commenter</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-layout>
</template>

<script>
import store from '@/store/store';
import { mapGetters } from 'vuex';

export default {
  store,
  data() {
    return {
      content: undefined,
      loading: false,
      typing: false,
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
    },
    isTyping() {
      if(this.content.length > 0) {
        this.typing = true;
      }
      else{
        this.typing = false;
      }
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
  margin: 15px 0px 15px 0px;
  .comment-form_form{
    padding-left: 15px;
    width: 100%;
    .v-input{
      padding: 0px;
    }
  }
}
</style>
