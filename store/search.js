export const state = () => ({
  isFocus: false,
})

export const mutations = {
  SET_FOCUS_VALUE(state, payload) {
    state.isFocus = payload
  },
}
export const actions = {
  setFocusValue({ commit }, payload) {
    commit('SET_FOCUS_VALUE', payload)
  },
}
