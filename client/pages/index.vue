<template>
  <v-layout column>
    <div class="text-xs-center">
      <div class="mt-3 title font-weight-bold">
        ワインについて教えてください
      </div>
      <div class="mt-3 mb-3 caption grey--text">
        スライダーを選択してデータを入力してください。<br>
        データをもとにAIが診断します。
      </div>
    </div>
    <form-card v-for="wineAttr in wineAttributes" :key="`${wineAttr.id}`" :wine-attr="wineAttr" :total="wineAttributes.length"/>
    <div v-if="isError" class="red--text body-2 text-xs-center">入力されていない数値があります</div>
    <v-btn @click="submit">診断結果を表示する</v-btn>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component, {Action, Getter, Mutation} from 'nuxt-class-component'
  import FormCard from '~/components/Form/FormCard.vue'
  import { WineAttribute } from '~/store/index.ts'
  import VueRouter from 'vue-router'

  @Component({
    components: {
      FormCard
    }})
  export default class Index extends Vue {
    @Mutation('SET_TITLE') setTitle
    @Getter('GET_WINE_ATTR') wineAttributes: WineAttribute[]
    @Action('POST_WINE_VALUE') postWineValue
    isError: boolean = false
    $router: VueRouter

    created () {
      this.setTitle('入力')
    }

    submit(){
      this.isError = false
      this.wineAttributes.forEach(attr => {
        if(!attr.value){
          this.isError = true
        }
      })

      if(!this.isError) {
        this.isError = false;
        this.postWineValue()
        this.$router.push('/result')
      }
    }
  }
</script>
