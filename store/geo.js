import GeoService from '@/services/GeoService.js'

export const state = () => ({
  data: null,
})

export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload
  },
}

export const actions = {
  fetchLocation({ state, commit }) {
    if (state.data) {
      return false
    }

    return GeoService.getLocation().then((response) => {
      console.log('Resp', response)
      response.data && commit('SET_DATA', response.data)
    })
  },
}
