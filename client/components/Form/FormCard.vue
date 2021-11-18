<template>
  <v-card class="ma-2 pa-1">
    <div class="subheading">
      酒石酸濃度
    </div>
    <div class="caption mb-2">
      1/11
    </div>
    <v-slider
      class="px-5 pt-12 pb-3"
      thumb-label="always"
      height="3"
      :max=1
      :min=0
      :step=0.1
    ></v-slider>
  </v-card>
</template>

<script lang="ts">
  import { Vue } from 'nuxt-property-decorator'
  
  export default class FormCard extends Vue  {}
</script>
