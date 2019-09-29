<template>
  <v-layout column>
    <div class="text-center">
      <div class="mt-3 title font-weight-bold">
        ワインについて教えてください
      </div>
      <div class="mt-3 mb-3 caption grey--text">
        スライダーを選択してデータを入力してください。<br>
        データをもとにAIが診断します。
      </div>
    </div>
    <form-card v-for="wineAttr in wineAttributes" :key="`${wineAttr.id}`" :wine-attr="wineAttr" :total="wineAttributes.length"/>
    <div v-if="isError" class="red--text body-2 text-center">入力されていない数値があります</div>
    <v-btn @click="submit">診断結果を表示する</v-btn>
  </v-layout>
</template>

<script lang="ts">
import {Vue, Getter, Mutation, Component} from 'nuxt-property-decorator'

import { WineAttribute } from '@/store/types.ts'
import VueRouter from 'vue-router'

@Component({
  components: {
    FormCard: () => import('@/components/Form/FormCard.vue')
  }})
export default class Index extends Vue {
  @Mutation('SET_TITLE') setTitle
  @Getter('GET_WINE_ATTR') wineAttributes: WineAttribute[]
  @Getter('IS_ALL_VALUE_SET') isAllValueSet
  isError: boolean = false
  $router: VueRouter

  created = () => {
    this.setTitle('入力')
  }

  submit = () => {
    if(!this.isAllValueSet()){
      this.isError = true
      return
    }
    this.isError = false
    this.$router.push('/result')
  }
}
</script>
