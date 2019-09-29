import { MutationTree, ActionTree, ActionContext, GetterTree, Store } from 'vuex'
import {State, WineAttribute, InputValue, Result} from '@/store/types';

const s = (): State => {
  return {
    title: '',
    wineAttributes: [],
    result: { value: 0, comment: '' }
  }
}

const mutations: MutationTree<State> = {
  SET_TITLE: (state, title: string): void => {
    state.title = title
  },
  SET_WINE_ATTR: (state, wineAttributes: WineAttribute[]): void => {
    state.wineAttributes = wineAttributes
  },
  SET_WINE_VALUE: (state, payload: { id: number; value: number }): void => {
    state.wineAttributes[payload.id - 1].value = payload.value
  },
  CLEAR_WINE_VALUE: (state): void => {
    state.wineAttributes.forEach((w): void => {
      delete state.wineAttributes[w.id - 1].value
    })
  },
  SET_RESULT: (state, value: number): void => {
    state.result.value = value
  }
}

const actions: ActionTree<null, State> = {
  async FETCH_WINE_ATTR({ commit }): Promise<void> {
    const res = await this.$axios.$get('/api/wine_attributes')
    if (res.wine_attributes) {
      commit('SET_WINE_ATTR', res.wine_attributes)
    }
  },
  async nuxtServerInit({ commit }): Promise<void> {
    const res = await this.$axios.$get('/api/wine_attributes')
    if (res.wine_attributes) {
      commit('SET_WINE_ATTR', res.wine_attributes)
    }
  },
  async POST_WINE_VALUE({ rootState, commit }): Promise<void> {
    const attributes: WineAttribute[] = [...rootState.wineAttributes]
    const inputValue: InputValue[] = []

    attributes.forEach((attr): void => {
      inputValue.push({ id: attr.id, value: attr.value })
    })

    const res = await this.$axios.$post('/api/predict', inputValue)
    if (res.status) {
      commit('SET_RESULT', res.result)
    }
  }
}

const getters: GetterTree<null, State> = {
  GET_TITLE: (state: State): string => {
    return state.title
  },
  GET_WINE_ATTR: (state: State): WineAttribute[] => {
    return state.wineAttributes
  },
  GET_RESULT: (state: State): Result => {
    return state.result
  },
  IS_ALL_VALUE_SET: (state: State): (() => boolean) => {
    return (): boolean => {
      let isAllValueSet = true
      state.wineAttributes.forEach((attr): void => {
        if (!attr.value){
          isAllValueSet = false
        }
      })
      return isAllValueSet
    }
  }
}

export { s as state, mutations, actions, getters }
