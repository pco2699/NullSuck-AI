<template>
  <v-card class="ma-2 pa-1">
    <div class="subheading">
      {{ wineAttr.japanese_title }}
    </div>
    <div class="caption mb-2">
      {{ wineAttr.id }}/{{total}}
    </div>
    <v-slider
      class="px-5 pt-12 pb-3"
      thumb-label="always"
      height="3"
      hide-details
      :max=wineAttr.max_value
      :min=wineAttr.min_value
      :step=wineAttr.step
      v-on:change="set"
    ></v-slider>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component, { Mutation } from 'nuxt-class-component'
  import { Prop } from 'vue-property-decorator'

  @Component
  export default class FormCard extends Vue  {
    @Mutation('SET_WINE_VALUE') setWineValue
    @Prop({type: Object}) wineAttr
    @Prop({type: Number}) total

    set(val: number){
      this.setWineValue({ id: this.wineAttr.id, value: val})
    }
  }
</script>
