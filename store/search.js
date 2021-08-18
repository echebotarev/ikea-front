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

    this.app.$services.api.getSearch(payload).then((response) => {
      response.data &&
        response.data.searchBox &&
        commit('SET_DATA', response.data.searchBox)
    })
  },
}
