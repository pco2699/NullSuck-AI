<template>
  <v-list two-line>
    <template v-for="w in wineAttr">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{w.japanese_title}}</v-list-item-title>
          <v-list-item-subtitle>{{w.english_title}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text> {{w.value }} </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { appStore } from "@/store";

@Component
export default class extends Vue {
  get wineAttr() {
    return appStore.wineAttributes;
  }
}
</script>
