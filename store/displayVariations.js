export const state = () => ({
  subtitle: '',
})

export const mutations = {
  SET_SUBTITLE(state, subtitle) {
    state.subtitle = subtitle
  },
}
export const actions = {
  setSubtitle({ commit }, subtitle) {
    commit('SET_SUBTITLE', subtitle)
  },
}
