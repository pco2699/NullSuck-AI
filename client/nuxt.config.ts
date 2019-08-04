const pkg = require('./package')
import colors from 'vuetify/es5/util/colors'

import NuxtConfiguration from '@nuxt/config'


const config: NuxtConfiguration = {
  mode: 'universal',

  server: {
    port: 3000, // デフォルト: 3000
    host: '0.0.0.0' // デフォルト: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  vue: {
    config: {
      devtools: true,
      productionTip: false
    }
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  devModules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    theme: {
      themes: {
        dark: false,
        light: {
          primary: colors.red.darken4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },
  proxy: {
    '/api':
      process.env.NODE_ENV === 'production'
        ? 'http://api-svc:5432'
        : 'http://api:5432'
  },
  watchers: {
    webpack: {
      poll: true
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config: any, ctx: any) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(ts|vue)$/,
          loader: 'tslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

export default config
