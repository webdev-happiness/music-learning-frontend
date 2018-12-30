<template>
  <div class="comments-list">
    <comment v-for="comment in comments" :comment="comment" v-if="comments"/>
  </div>
</template>

<script>
import store from '@/store/store';
import comment from '@/components/comments/comment.vue';
import loader from '@/components/loading/loader.vue';
import { mapGetters } from 'vuex';

export default {
  components: { comment, loader },
  store,
  props: {
    lessonId: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {

    };
  },
  mounted() {
    this.$store.dispatch('comments/loadAll', this.lessonId).then();
  },
  computed: {
    ...mapGetters({
      comments: 'comments/getAll',
      loading: 'ui/loading',
    }),
  },
};
</script>

<style>

</style>
