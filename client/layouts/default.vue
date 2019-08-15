<template>
  <v-app>
    <v-app-bar
      fixed
      app
      color="primary"
      class="white--text"
    >
      <v-app-bar-nav-icon class="white--text"/>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
  import { Vue, Component, Getter} from 'nuxt-property-decorator'

  @Component
  export default class extends Vue {
    @Getter('GET_TITLE') title: string;
  }
</script>
