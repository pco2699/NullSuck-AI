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
import {Vue,  Component} from 'nuxt-property-decorator'
import { appStore } from '@/store';

@Component({
  components: {
    FormCard: () => import('@/components/Form/FormCard.vue')
  }})
export default class Index extends Vue {
  private isError: boolean = false;

  get wineAttributes() {
    return appStore.wineAttributes;
  }

  private created() {
    appStore.SET_TITLE('入力');
  }

  private async submit() {
    console.log(appStore.IsAllValueSet());
    if(!appStore.IsAllValueSet()){
      this.isError = true;
      return
    }
    this.isError = false;
    await appStore.POST_WINE_VALUE();
    await this.$router.push('/result')
  }
}
</script>
