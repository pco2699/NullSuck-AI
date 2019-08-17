import { MutationTree, ActionTree, ActionContext, GetterTree } from 'vuex'

export interface Result {
  value: number
  comment: string
}

export interface WineAttribute {
  id: number
  japanese_title: string
  english_title: string
  value: number
  step: number
  max_value: number
  min_value: number
}

export interface State {
  title: string
  wine_attributes: WineAttribute[]
  result: Result
}

export interface InputValue {
  id: number
  value: number
}

const s = (): State => {
  return {
    title: '',
    wine_attributes: [],
    result: { value: 0, comment: '' }
  }
}

const mutations: MutationTree<State> = {
  SET_TITLE: (state, title: string) => {
    state.title = title
  },
  SET_WINE_ATTR: (state, wineAttributes: WineAttribute[]) => {
    state.wine_attributes = wineAttributes
  },
  SET_WINE_VALUE: (state, payload: { id: number; value: number }) => {
    state.wine_attributes[payload.id - 1].value = payload.value
  },
  CLEAR_WINE_VALUE: state => {
    state.wine_attributes.forEach(w => {
      delete state.wine_attributes[w.id - 1].value
    })
  },
  SET_RESULT: (state, value: number) => {
    state.result.value = value
  }
}

const actions: ActionTree<State, any> = {
  async FETCH_WINE_ATTR(store: ActionContext<State, any>) {
    const res = await (this as any).$axios.$get('/api/wine_attributes')
    if (res.wine_attributes) {
      store.commit('SET_WINE_ATTR', res.wine_attributes)
    }
  },
  async nuxtServerInit(store: ActionContext<State, any>) {
    const res = await (this as any).$axios.$get('/api/wine_attributes')
    if (res.wine_attributes) {
      store.commit('SET_WINE_ATTR', res.wine_attributes)
    }
  },
  async POST_WINE_VALUE(store: ActionContext<State, any>) {
    const attributes: WineAttribute[] = [...store.state.wine_attributes]
    const inputValue: InputValue[] = []

    attributes.forEach(attr => {
      inputValue.push({ id: attr.id, value: attr.value })
    })

    const res = await (this as any).$axios.$post('/api/predict', inputValue)
    if (res.status) {
      store.commit('SET_RESULT', res.result)
    }
  }
}

const getters: GetterTree<State, any> = {
  GET_TITLE: (state: State): string => {
    return state.title
  },
  GET_WINE_ATTR: (state: State): WineAttribute[] => {
    return state.wine_attributes
  },
  GET_RESULT: (state: State): Result => {
    return state.result
  },
  IS_ALL_VALUE_SETTED: (state: State): (() => boolean) => {
    return () => {
      let isAllValueSetted: boolean = true
      state.wine_attributes.forEach(attr => {
        if (!attr.value){
          isAllValueSetted = false
        }
      })
      return isAllValueSetted
    }
  }
}

export { s as state, mutations, actions, getters }
