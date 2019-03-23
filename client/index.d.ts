import Vue from 'vue'
import { Route } from 'vue-router'
import { Store } from 'vuex'
import { AxiosInstance } from 'axios'

declare module '*.vue' {
  import Vue from 'vue'
  const _default: Vue
  export default _default
}

interface NuxtContext {
  isClient: boolean
  isServer: boolean
  isStatic: boolean
  isDev: boolean
  isHMR: boolean
  route: Route
  store: Store<any>
  env: object
  query: object
  nuxtState: object
  req: Request
  res: Response
  params: { [key: string]: any }
  redirect: (path: string) => void
  error: (params: { statusCode?: string; message?: string }) => void
  beforeNuxtRender: ({ Conmponents, nuxtState }) => void
  $axios: AxiosInstance // axios-moduleを利用している場合
}
