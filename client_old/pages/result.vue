<template>
  <v-layout column>
    <result-chart/>
    <result-list/>
    <v-btn @click="back">もう一度診断する</v-btn>
  </v-layout>

</template>

<script lang="ts">
  import Vue from 'vue'
  import Component, { Mutation } from 'nuxt-class-component'

  import VueRouter from 'vue-router'

  @Component({
    components: {
      ResultChart: () => import('~/components/Result/ResultChart.vue'),
      ResultList: () => import('~/components/Result/ResultList.vue')
    }
  })
  export default class Result extends Vue {
    @Mutation('SET_TITLE') setTitle
    @Mutation('CLEAR_WINE_VALUE') clear
    $router: VueRouter

    async fetch(ctx) {
      await ctx.store.dispatch("POST_WINE_VALUE")
    }

    created () {
      this.setTitle('診断結果')
    }

    back(){
      this.clear()
      this.$router.back()
    }

  }
</script>
