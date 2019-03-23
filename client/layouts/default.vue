<template>
  <v-app>
    <v-toolbar
      app
      color="primary"
      class="white--text"
    >
      <v-toolbar-side-icon class="white--text"/>
      <v-toolbar-title v-text="title" />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer
      app
    >
      <span>&copy; Norwegian Geek 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component, {Getter} from 'nuxt-class-component'

  @Component
  export default class Layout extends Vue {
    @Getter('GET_TITLE') title: string;

  }
</script>
