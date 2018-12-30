<template>
  <v-layout class="comment">
    <div class="avatar">
      <v-avatar
        size="35"
      >
        <img :src="comment.author.avatar" alt="alt">
      </v-avatar>
    </div>
    <div class="content">
      <p class="metadata">
        <span class="author">{{comment.author.username}}</span>,
        <span class="date">Le 12/01/2018</span>
      </p>
      <p class="text">
        {{comment.content}}
      </p>
      <p class="action">
        <a href="">repondre</a>
      </p>
      <div class="replies" v-if="comment.replies">
        <hr>
        <comment v-for="(c,i) in comment.replies" :comment="c" :key="i"/>
      </div>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: 'comment',
  props: {
    comment: {
      type: Object,
      default: undefined,
    },
  },
};
</script>

<style lang="scss">
.comment {
  margin: 15px 0px 25px 0px;
  .content {
    padding-left: 15px;
    .metadata{
      .author{
        font-weight: bold;
      }
    }
  }
}

</style>
