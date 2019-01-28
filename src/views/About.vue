<template>
  <div class="about">
    <header class="about-header">
        <v-container>
        <h1 class="display-3 text-xs-center">Bienvenue sur Rocking Place</h1>
        <v-img
          src="https://picsum.photos/500/300?image=4"
          max-height="600"
          aspect-ratio="1"
          class="grey lighten-2 thumbnail"
        >
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate></v-progress-circular>
          </v-layout>
        </v-img>
      </v-container>
    </header>
    <v-container class="about-content" grid-list-xl>
      <v-layout>
        <v-flex md6>
          <v-img
            src="https://picsum.photos/500/300?image=4"
            max-height="300"
            aspect-ratio="1"
            class="grey lighten-2 thumbnail"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular indeterminate></v-progress-circular>
            </v-layout>
          </v-img>
        </v-flex>
        <v-flex md6>
          <h2 class="display-1">Rocking Place | Collectif</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="scss">
  .about-header {
    background-color: #e7e7e7;
    padding: 20px 0px 50px 0px;
    h1 {
      margin-bottom: 20px;
    }
  }
  .about-content {
    margin-top: 50px;
  }
</style>
