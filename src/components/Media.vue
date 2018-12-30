<template lang="html">
  <video class="mediaplayer" id="video"
    width="640" height="360" preload="none"
    style="max-width: 100%; width: 100%; height: 100%; display: none;"
    poster=""
    playsinline="" webkit-playsinline=""
    :src="file">
  </video>
</template>

<script>
import 'mediaelement';
// Import stylesheet and shims
import 'mediaelement/build/mediaelementplayer.min.css';

export default {
  props: {
    file: {
      type: String,
      default: null,
    },
  },
  mounted() {
    let player = new MediaElementPlayer('video', {
      pluginPath: 'https://cdnjs.com/libraries/mediaelement/',
      success: (mediaElement, originalNode, instance) => {

      },
    });
  },
};
</script>

<style lang="css">
</style>
