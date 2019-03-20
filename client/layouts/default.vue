<template>
  <v-app>
    <v-toolbar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
    </v-toolbar>
    <v-footer
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'Vue'
  import Component from 'nuxt-class-component'

  @Component
  export default class Layout extends Vue {
    title: string;
    constructor(){
      super();
      this.title = 'ヌルサクAI';
    }
  }
</script>
