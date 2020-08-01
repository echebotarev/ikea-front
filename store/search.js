import ApiService from '@/services/ApiService.js'
export const state = () => ({
  value: '',
  data: {},
})

export const mutations = {
  SET_VALUE(state, payload) {
    state.value = payload
  },

  SET_DATA(state, payload) {
    state.data = payload
  },
}
export const actions = {
  setValue({ commit }, payload) {
    commit('SET_VALUE', payload)

    ApiService.getSearch(payload).then((response) => {
      console.log('Response Data', response.data)
      commit('SET_DATA', response.data.searchBox)
    })
  },
}
