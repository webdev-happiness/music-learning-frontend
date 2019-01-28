<template>
  <div class="comments-list" v-if="!loading">
    <commentForm v-if="user"/>
    <comment v-for="comment in comments" :comment="comment" v-if="comments"/>
  </div>
  <div class="comments-loader" v-else>
    <loader/>
  </div>
</template>

<script>
import store from '@/store/store';
import comment from '@/components/comments/comment.vue';
import commentForm from '@/components/comments/form.vue';
import loader from '@/components/loading/loader.vue';
import { mapGetters } from 'vuex';

export default {
  components: { comment, loader, commentForm },
  store,
  props: {
    lessonId: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('comments/loadAll', this.lessonId).then(
      () => {
        this.loading = false;
      }
    );
  },
  computed: {
    ...mapGetters({
      comments: 'comments/getAll',
      user: 'auth/getInfos'
    }),
  },
};
</script>

<style lang="scss">
  .comments-loader{
    min-height:  500px;
  }
</style>
