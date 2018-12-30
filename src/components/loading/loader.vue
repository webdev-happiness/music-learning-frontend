<template>
  <div class="loader">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>

</script>

<style>
  .loader {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
