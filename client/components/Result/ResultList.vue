<template>
  <v-list two-line>
    <template v-for="w in wineAttr">
      <v-list-tile avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{w.japanese_title}}</v-list-tile-title>
          <v-list-tile-sub-title>{{w.english_title}}</v-list-tile-sub-title>
        </v-list-tile-content>
      <v-list-tile-action>
        <v-list-tile-action-text> {{w.value }} </v-list-tile-action-text>
      </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
    </template>
  </v-list>
    
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component, { Getter } from 'nuxt-class-component'
  import {WineAttribute} from "~/store";

  @Component
  export default class ResultList extends Vue {
    @Getter('GET_WINE_ATTR') wineAttr: WineAttribute[]
  }
</script>

<style scoped>

</style>
