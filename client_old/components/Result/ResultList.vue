<template>
  <v-list two-line>
    <template v-for="w in wineAttr">
      <v-list-item avatar>
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
import Component, { Getter, Vue } from 'nuxt-class-component'
import { WineAttribute } from '~/store'

@Component
export default class ResultList extends Vue {
  @Getter('GET_WINE_ATTR') wineAttr: WineAttribute[]
}
</script>
